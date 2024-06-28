'use client';

// COMPONENTS
import Link from 'next/link';
import { Button } from '@/components/shared/button';
import { Input } from '@/components/shared/input';

import { signUpWithCredentials } from '@/actions/auth';
import { useFormState } from 'react-dom';

export default function Page(): JSX.Element {
	const [{ error }, formAction] = useFormState(signUpWithCredentials, {
		error: '',
		success: ''
	});

	return (
		<div className=" grid place-items-center w-full ">
			<div className="flex flex-col gap-2 [&>input]:text-black mt-40">
				<div className="flex flex-col gap-2 w-full items-start bg-[#0b0b0b] px-14 py-7 rounded-md ">
					<h1 className="text-3xl self-center mb-6">Sign Up</h1>
					<form className="flex flex-col w-full" action={formAction}>
						<Input name="email" label="Email" type="text"></Input>
						<Input name="password" label="Password" type="password"></Input>
						{error !== null ? <span className="text-red-500 mt-4">{error}</span> : ''}
						<Button className="mt-4 bg-green-600  text-white ">Create Account</Button>
					</form>
					{/* <CredentialsButton /> */}
					<Link href={'/signin'} className="mt-6 hover:underline">
						Sign in &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
}
