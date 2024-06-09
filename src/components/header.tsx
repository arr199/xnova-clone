'use client';
// ICONS
import { IoLogoTux } from 'react-icons/io';

import { RESOURCES } from '../entities/resources';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Header(): JSX.Element {
	const router = useRouter();

	async function handleSignout() {
		const res = await fetch('/api/auth/signout').catch(console.error);
		const { success = null, error = null } = await res.json();
		console.log(success);
		console.log(error);
		if (success) {
			router.push('/');
		}
	}

	useEffect(() => {}, []);

	return (
		<header className="grid p-5 border-b items-center grid-cols-3">
			<div className="flex">
				<IoLogoTux className="w-10 h-10"></IoLogoTux>
				<h1 className="ml-4 text-4xl text-white">Xnova Clone</h1>
			</div>
			{/* RESOURCES */}
			<div className="flex gap-12  justify-self-center">
				{RESOURCES.map((resource, index) => (
					<div className="flex flex-col gap-2 items-center" key={index}>
						<div className="flex items-center gap-2">
							<resource.icon
								color={`${resource.color}`}
								className={`w-6 h-6`}></resource.icon>
							<span className="text-white">{resource.name}</span>
						</div>
						<span className="text-[#3a9756]">123</span>
					</div>
				))}
			</div>
			{/* AUTHENTICATION */}
			<div className="flex items-end justify-self-end gap-4">
				<div className="flex flex-col items-center gap-2">
					{JSON.stringify('session')}
					{/* <img className="w-10 rounded-full" src={session?.user?.image ?? ''} alt="" /> */}
					{/* <span>{session?.user?.email}</span>
					<span>{session?.user?.id}</span> */}
				</div>

				<Link
					href={'/api/auth/signin'}
					className="bg-blue-400 text-white px-4 py-2 rounded-md">
					Signin
				</Link>

				<button
					onClick={handleSignout}
					className="bg-red-400 text-white px-4 py-2 rounded-md">
					Logout
				</button>
			</div>
		</header>
	);
}
