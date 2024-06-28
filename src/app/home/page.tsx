'use client';

import { MINES } from '@/entities/mines';
import type { MineType } from '@/entities/mines';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { fetchUserData } from '@/redux/slices/userData';
import { useEffect } from 'react';
import { useFetchNumber } from '@/hooks/useFetchNumber';
import { MineCard } from '@/components/minesPage/mineCard';

export default function Home(): JSX.Element {
	const dispatch = useDispatch<AppDispatch>();
	const data = useSelector((state: RootState) => state.userData);
	const { handleFetchNumber } = useFetchNumber();

	useEffect(() => {
		dispatch(fetchUserData()).catch(console.error);
	}, [dispatch]);

	function handleUpgradeMine(type: MineType): void {
		handleFetchNumber().catch(console.error);
	}

	return (
		<div className="flex justify-center p-24  w-full   ">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10 w-full ">
				{MINES.map(mine => {
					const rate =
						mine.type === 'btc' ? data?.btc_rate : mine.type === 'eth' ? data?.eth_rate : data?.usd_rate;

					const cost =
						mine.type === 'btc'
							? data?.btc_upgrade_cost
							: mine.type === 'eth'
								? data?.eth_upgrade_cost
								: data?.usd_upgrade_cost;

					return (
						<MineCard
							imgSrc={mine.image}
						    type={mine.type}
							level={mine.level}
							rate={rate}
							label={mine.label}
							cost={cost}
							key={mine.id}
							timeToNextUpgrade={0}
							handleUpgradeMine={() => {
								handleUpgradeMine(mine.type);
							}}></MineCard>
					);
				})}
			</div>
		</div>
	);
}
