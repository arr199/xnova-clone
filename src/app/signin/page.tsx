export default async function Page(): Promise<JSX.Element> {
	return (
		<div className=" grid place-items-center w-full mt-10">
			<div className="flex flex-col gap-2 [&>input]:text-black mt-40">
				<div className="flex flex-col gap-2 w-full items-start">
					<CredentialsButton />
					<span className="self-center">OR</span>
					<GithubButton />
					<GoogleButton />
				</div>
			</div>
		</div>
	);
}

function GithubButton(): JSX.Element {
	return (
		<form className="w-full">
			<button className="bg-black py-1 w-full">Sign In with Github</button>
		</form>
	);
}

function GoogleButton(): JSX.Element {
	return (
		<form className="w-full">
			<button className="bg-white py-1 text-black w-full">Sign In with Google</button>
		</form>
	);
}

function CredentialsButton() {
	return (
		<form className="flex flex-col">
			<label htmlFor="">Email</label>
			<input name="username" className="text-black" />
			<label htmlFor="">Password</label>
			<input name="password" className="text-black" type="password" />
			<button className="bg-green-500 py-1 mt-2  w-full">Sign In</button>
		</form>
	);
}
