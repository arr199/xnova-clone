import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SafeFieldsFromUsersTable } from '../../../types';

interface ExtraData {
	loading: boolean;
	dataIsReady: boolean;
}

const intialState: SafeFieldsFromUsersTable & ExtraData = {
	btc_amount: 0,
	btc_level: 0,
	btc_rate: 0,
	btc_upgrade_cost: 0,
	eth_amount: 0,
	eth_level: 0,
	eth_rate: 0,
	eth_upgrade_cost: 0,
	last_collected: '',
	nickname: '',
	usd_amount: 0,
	usd_level: 0,
	usd_rate: 0,
	usd_upgrade_cost: 0,
	email: '',
	loading: false,
	dataIsReady: false
};

const userData = createSlice({
	name: 'userData',
	initialState: intialState,
	reducers: {
		setUserData: (state, action) => {
			return action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserData.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(fetchUserData.fulfilled, (state, { payload }) => {
				console.log('FULFILLED');
				console.log(payload);

				state = payload;
				state.loading = false;
				state.dataIsReady = true;
				return state;
			});
	}
});

export const fetchUserData = createAsyncThunk('userData/fetchUserData', async () => {
	try {
		console.log('FETCHING USER DATA');
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUserData`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('ERROR FETCHING USER DATA', error);
	}
});

export const { setUserData } = userData.actions;

export default userData.reducer;
