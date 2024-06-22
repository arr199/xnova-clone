import { ERROR } from '@/auth/errors';
import { useEffect, useState } from 'react';
import type { Database } from '../../database.types';

interface FetchNumberResponse {
	error?: string | null;
	data?: Database['public']['Tables']['users']['Row'] | null;
	loading: boolean;
}

export function useFetchUserData(): FetchNumberResponse {
	const [data, setData] = useState<Database['public']['Tables']['users']['Row'] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const handleFetchUserData = async (): Promise<void> => {
			try {
				setLoading(true);
				const response = await fetch('/api/getUserData');
				const data = await response.json();
				setData(data as Database['public']['Tables']['users']['Row']);
			} catch (error) {
				setError(ERROR.SERVER_ERROR);
			} finally {
				setLoading(false);
			}
		};

		handleFetchUserData().catch(console.error);
	}, []);

	return { data, error, loading };
}
