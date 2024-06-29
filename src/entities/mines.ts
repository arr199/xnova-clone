export interface Mine {
	id: number;
	label: MineLabel;
	image?: string;
	level: number;
	rate?: number;
	type: MineType;
}
export type MineType = 'btc' | 'eth' | 'usd';
export type MineLabel = 'Bitcoin' | 'Ethereum' | 'USD';

export const MINES: Mine[] = [
	{ id: 1, type: 'btc', label: 'Bitcoin', image: '/images/bitcoin.png', level: 1 },
	{ id: 2, type: 'eth', label: 'Ethereum', image: '/images/ethereum.png', level: 1 },
	{ id: 3, type: 'usd', label: 'USD', image: '/images/dollar.png', level: 1 }
];
