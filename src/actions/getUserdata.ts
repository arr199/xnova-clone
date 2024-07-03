'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { ERROR } from '@/utils/errors';
import type { SafeFieldsFromUsersTable } from '../../types';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';

//  FIELDS TO GET FROM THE DATABASE
const FieldsToGetFromDatabase: Record<keyof SafeFieldsFromUsersTable, boolean> = {
	email: true,
	btc_amount: true,
	btc_level: true,
	btc_rate: true,
	btc_upgrade_cost: true,
	eth_amount: true,
	eth_level: true,
	eth_rate: true,
	eth_upgrade_cost: true,
	usd_amount: true,
	usd_level: true,
	usd_rate: true,
	usd_upgrade_cost: true,
	nickname: true,
	last_collected: true
};

export async function getUser(): Promise<any> {
	// GETTING THE SESSION FROM THE COOKIES

	const session = cookies().get('session')?.value;
	if (session === undefined) {
		return NextResponse.json({ error: 'Invalid session' });
	}

	//  VERIFYING JWT TOKEN
	try {
		jwt.verify(session, process.env.JWT_SECRET ?? '');
	} catch (error) {
		console.error('FAILING VERIFYING JWT TOKEN');
		return NextResponse.json({ error: 'Invalid session' });
	}

	//  GETTING THE USER ID FROM THE SESSION
	const decodedSession = jwt.decode(session) as Session;
	const { id } = decodedSession;

	try {
		// GETTING THE USER DATA FROM THE DATABASE
		const { data, error } = await supabase
			.from('users')
			.select(Object.keys(FieldsToGetFromDatabase).join(',') as '*')
			.eq('id', id);

		// VALIDATING ERRORS
		if (error !== null || data === null) {
			console.error('FAILING FETCHING USER DATA FROM DATABASE', error);
			return NextResponse.json({ error: ERROR.SERVER_ERROR });
		}
		if (data?.length <= 0) {
			console.error('FAILING FETCHING USER DATA FROM DATABASE');
			return NextResponse.json({ error: ERROR.USER_NOT_FOUND });
		}

		const userData = data[0];
		console.log(userData);

		// CALCULATING THE DIFFERENCE IN SECONDS BETWEEN THE LAST TIME THE USER COLLECTED AND NOW
		const diff = differenceInSeconds(
			new Date(Date.now()).toISOString(),
			new Date(userData.last_collected as string).toISOString()
		);
		// IF THE DIFFERENCE IS LESS THAN 0 THEN THE USER HAS ALREADY COLLECTED THE RESOURCES
		if (diff <= 0) {
			return NextResponse.json(userData);
		}

		//  UPDATING THE AMOUNTS OF RESOURCES
		const newBtcAmount = userData.btc_amount + userData.btc_rate * diff;
		const newEthAmount = userData.eth_amount + userData.eth_rate * diff;
		const newUsdAmount = userData.usd_amount + userData.usd_rate * diff;

		console.log(diff);

		// SAVING THE NEW AMOUNTS OF RESOURCES IN THE DATABASE
		const { data: updateData, error: updateError } = await supabase
			.from('users')
			.update({
				btc_amount: newBtcAmount,
				eth_amount: newEthAmount,
				usd_amount: newUsdAmount,
				last_collected: new Date(Date.now()).toISOString()
			})
			.eq('id', id)
			.select(Object.keys(FieldsToGetFromDatabase).join(',') as '*');

		// VALIDATING ERRORS
		if (updateError !== null || updateData === null) {
			console.error('FAILING FETCHING USER DATA FROM DATABASE', error);
			return NextResponse.json({ error: ERROR.SERVER_ERROR });
		}
		if (updateData?.length <= 0) {
			console.error('FAILING FETCHING USER DATA FROM DATABASE');
			return NextResponse.json({ error: ERROR.USER_NOT_FOUND });
		}
		// RETURNING THE UPDATED DATA
		const updatedUserData = updateData[0];
		return updatedUserData;
	} catch (error) {
		console.error('FAILING FETCHING USER DATA FROM DATABASE');
		return NextResponse.json({ error: ERROR.SERVER_ERROR });
	}
}

export interface Session {
	id: string;
	email: string;
	iat: number;
	exp: number;
}
