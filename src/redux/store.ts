import { configureStore } from '@reduxjs/toolkit';
import userDataReduce from '@/redux/slices/userData';

export const store = configureStore({
	reducer: {
		userData: userDataReduce
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
