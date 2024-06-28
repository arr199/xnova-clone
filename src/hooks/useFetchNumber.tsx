import { useState } from 'react';
import { ERROR } from '@/utils/errors';
interface FetchNumberResponse {
	error?: string | null;
	number?: number;
	handleFetchNumber: () => Promise<void>;
}

export function useFetchNumber(): FetchNumberResponse {
	const [number, setNumber] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);

	const handleFetchNumber = async (): Promise<void> => {
		try {
			const response = await fetch('/api/getNumber');
			const data = await response.json();
			setNumber(data as number);
			setError(null);
		} catch (error) {
			setError(ERROR.SERVER_ERROR);
		}
	};

	return { number, handleFetchNumber, error };
}
