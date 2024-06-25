export interface Mine {
	id: number;
	label: 'BITCOIN MINE' | 'ETHEREUM MINE' | 'USD MINE';
	image?: string;
	level: number;
	profitPerHour?: number;
	type: 'btc' | 'eth' | 'usd';
}

export const MINES: Mine[] = [
	{ id: 1, type: 'btc', label: 'BITCOIN MINE', image: '/images/bitcoin.png', level: 1 },
	{ id: 2, type: 'eth', label: 'ETHEREUM MINE', image: '/images/ethereum.png', level: 1 },
	{ id: 3, type: 'usd', label: 'USD MINE', image: '/images/dollar.png', level: 1 }
];
