'use client';
// ICONS
import { IoLogoTux } from 'react-icons/io';

import { RESOURCES } from '../../entities/resources';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useSession';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { Skeleton } from '../shared/skeleton';
import { Amount } from './amount';

export function Header(): JSX.Element {
	const {
		btc_amount,
		btc_rate,
		eth_amount,
		eth_rate,
		usd_amount,
		usd_rate,
		loading,
		dataIsReady
	} = useSelector((state: RootState) => state.userData);
	const router = useRouter();
	const { session, signOut } = useAuth();

	async function handleSignout(): Promise<void> {
		signOut();
		router.push('/');
	}

	return (
		<header className="grid p-5 border-b items-center grid-cols-3">
			<div className="flex">
				<IoLogoTux className="w-10 h-10"></IoLogoTux>
				<h1 className="ml-4 text-4xl text-white">Xnova Clone</h1>
			</div>
			{/* RESOURCES */}
			<div className="flex gap-12  justify-self-center">
				{RESOURCES.map((resource, index) => {
					const amount =
						resource.type === 'btc'
							? btc_amount
							: resource.type === 'eth'
							? eth_amount
							: resource.type === 'usd'
							? usd_amount
							: 0;

					const rate =
						resource.type === 'btc'
							? btc_rate
							: resource.type === 'eth'
							? eth_rate
							: resource.type === 'usd'
							? usd_rate
							: 0;

					return (
						<div
							className="flex flex-col gap-2 items-center relative  h-10 w-max px-4"
							key={index}>
							<div className="flex items-center gap-2">
								<resource.icon
									color={`${resource.color}`}
									className={`w-6 h-6`}></resource.icon>
								<span className="text-white">{resource.label}</span>
							</div>
							<div className="text-[#3a9756]  absolute bottom-0 leading-[0]">
								{!dataIsReady ?? loading ? (
									<Skeleton className=" h-2 w-10 rounded-md"></Skeleton>
								) : (
									<Amount amount={amount} rate={rate}></Amount>
								)}
							</div>
						</div>
					);
				})}
			</div>
			{/* AUTHENTICATION */}
			<div className="flex items-end justify-self-end gap-4">
				<div className="flex flex-col items-center gap-2">
					<span> {session !== null ? session?.email : ''}</span>
				</div>
				<Link
					href={'/api/auth/signin'}
					className="bg-blue-400 text-white px-4 py-2 rounded-md">
					Signin
				</Link>
				<button
					onClick={handleSignout}
					className="bg-red-400 text-white px-4 py-2 rounded-md">
					Logout
				</button>
			</div>
		</header>
	);
}
