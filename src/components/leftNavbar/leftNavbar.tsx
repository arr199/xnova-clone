import Link from 'next/link';

export default function LeftNavbar(): JSX.Element {
	return (
		<div className="flex flex-col h-full border-r w-60 pl-4 py-10">
			<ul className="[&>a]:text-2xl  ">
				<Link className="hover:underline" href={'#'}>
					Mines
				</Link>
			</ul>
		</div>
	);
}
