export interface Mine {
	id: number;
	name: 'BITCOIN MINE' | 'ETHEREUM MINE' | 'USD MINE';
	image?: string;
	level: number;
}

export const MINES: Mine[] = [
	{ id: 1, name: 'BITCOIN MINE', image: '/images/bitcoin.png', level: 1 },
	{ id: 2, name: 'ETHEREUM MINE', image: '/images/ethereum.png', level: 1 },
	{ id: 3, name: 'USD MINE', image: '/images/dollar.png', level: 1 }
];
