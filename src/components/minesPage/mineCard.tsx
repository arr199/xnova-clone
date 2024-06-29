import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type MineType } from '@/entities/mines';

export interface MineProps {
	type: MineType;
	label: string;
	rate: number;
	cost: number;
	level: number;
	timeToNextUpgrade: number;
	imgSrc?: string;
	handleUpgradeMine: () => void;
}

export function MineCard({
	type,
	label,
	rate,
	cost,
	level,
	timeToNextUpgrade,
	imgSrc,
	handleUpgradeMine
}: MineProps): JSX.Element {
	return (
		<Card className="w-full max-w-sm ">
			<img src={imgSrc} alt="Mine image" className="rounded-t-lg object-cover w-full aspect-[3/2]" />
			<CardContent className="p-6 space-y-4">
				<div className="flex items-center justify-between">
					<div className="text-lg font-semibold">{label}</div>
					<div className=" font-semibold">{rate}/h</div>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="text-muted-foreground">Upgrade Cost</div>
						<div className="font-semibold">{cost}</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-muted-foreground">Time to Next Upgrade</div>
						<div className="font-semibold">{timeToNextUpgrade} hours</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-muted-foreground">Current Level</div>
						<div className="font-semibold">{level}</div>
					</div>
				</div>
				<Button onClick={handleUpgradeMine} variant="default" className="w-full">
					Upgrade
				</Button>
			</CardContent>
		</Card>
	);
}
