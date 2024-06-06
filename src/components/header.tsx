// ICONS
import { IoLogoTux } from 'react-icons/io';

import { RESOURCES } from '../entities/resources';

export function Header(): JSX.Element {
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
							<resource.icon className={`w-6 h-6 text-${resource.color}`}></resource.icon>
							<span className="text-white">{resource.name}</span>
						</div>
						<span className="text-[#3a9756]">123</span>
					</div>
				))}
			</div>
			{/* AUTHENTICATION */}
			<div className="justify-self-end">
				<button className="bg-blue-400 text-white px-4 py-2 rounded-md">Login</button>
			</div>
		</header>
	);
}
