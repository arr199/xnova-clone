import { Header } from '@/components/header';
import LeftNavbar from '@/components/leftNavbar/leftNavbar';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
	return (
		<>
			<Header></Header>
			<main className="flex w-full h-full  ">
				<LeftNavbar></LeftNavbar>
				{children}
			</main>
		</>
	);
}
