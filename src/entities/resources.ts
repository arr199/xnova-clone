import { FaEthereum, FaDollarSign } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa6';

export interface Resource {
	id: number;
	name: string;
	icon: JSX.Element;
}

export const RESOURCES = [
	{ name: 'BTC', icon: FaBitcoin, color: 'orange-400' },
	{ name: 'ETH', icon: FaEthereum, color: 'blue-400' },
	{ name: 'USD', icon: FaDollarSign, color: 'green-400' }
];
