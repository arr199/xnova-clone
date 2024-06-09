import { FaEthereum, FaDollarSign } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa6';

export interface Resource {
	id: number;
	name: string;
	icon: JSX.Element;
	color: string;
}

export const RESOURCES = [
	{ name: 'BTC', icon: FaBitcoin, color: 'orange' },
	{ name: 'ETH', icon: FaEthereum, color: 'skyBlue' },
	{ name: 'USD', icon: FaDollarSign, color: 'green' }
];
