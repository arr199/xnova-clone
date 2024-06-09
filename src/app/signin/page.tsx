import { signInWithGithub, signInWithGoogle } from '@/auth/actions';
import { revalidatePath } from 'next/cache';

revalidatePath('/signin');
export default async function Page(): Promise<JSX.Element> {
	return (
		<div className=" grid place-items-center w-full mt-10">
			<div className="flex flex-col gap-2 [&>input]:text-black mt-40">
				<label htmlFor="">Email</label>
				<input type="email" />
				<label htmlFor="">Password</label>
				<input type="password" />
				<div className="flex flex-col gap-2 w-full items-start">
					<button className="bg-green-500 py-1 mt-2  w-full">Sign In</button>
					<span className='self-center'>OR</span>
					<GithubButton />
					<GoogleButton />
				</div>
			</div>
		</div>
	);
}

function GithubButton(): JSX.Element {
	return (
		<form className="w-full" action={signInWithGithub}>
			<button className="bg-black py-1 w-full">Sign In with Github</button>
		</form>
	);
}

function GoogleButton(): JSX.Element {
	return (
		<form className="w-full" action={signInWithGoogle}>
			<button className="bg-white py-1 text-black w-full">Sign In with Google</button>
		</form>
	);
}
