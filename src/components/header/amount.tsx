import { useEffect, useState } from 'react';

const UPDATE_PRICE_INTERVAL = 2000;

export function Amount({ amount, rate }: { amount: number; rate: number }): JSX.Element {
	const [currentAmount, setCurrentAmount] = useState<number>(amount);

	useEffect(() => {
		const increaseAmount = setInterval(() => {
			setCurrentAmount(newAmount => {
				return newAmount + rate * (UPDATE_PRICE_INTERVAL / 1000);
			});
		}, UPDATE_PRICE_INTERVAL);

		return () => {
			clearInterval(increaseAmount);
		};
	}, []);

	return <span>{formatNumber(currentAmount)}</span>;
}

function formatNumber(n: number): string {
	return n.toLocaleString('en-US', {});
}
