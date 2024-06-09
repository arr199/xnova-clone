import { MINES } from '@/entities/mines';

export default function Home(): JSX.Element {
	return (
		<div className="flex justify-center p-24  w-full   ">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10 w-full ">
				{MINES.map(mine => (
					<div key={mine.id} className="relative flex flex-col gap-2 p-4 border rounded-md h-52  ">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl">{mine.name}</h1>
							<p className="border px-4 py-1 rounded">{mine.level}</p>
						</div>
						<button className="absolute right-2 bottom-2 bg-green-700 px-6 py-2 rounded hover:opacity-80 ">
							Upgrade Mine
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
