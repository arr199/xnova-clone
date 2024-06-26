import type { IconType } from 'react-icons';
import { FaEthereum, FaDollarSign } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa6';

export interface Resource {
	type: ResourceType;
	label: string;
	icon: IconType;
	color: string;
}

export type ResourceType = 'btc' | 'eth' | 'usd';

export const RESOURCES: Resource[] = [
	{ type: 'btc', label: 'BTC', icon: FaBitcoin, color: 'orange' },
	{ type: 'eth', label: 'ETH', icon: FaEthereum, color: 'skyBlue' },
	{ type: 'usd', label: 'USD', icon: FaDollarSign, color: 'green' }
];
