'use client';

// COMPONENTS
import Link from 'next/link';

import { Input } from '@/components/shared/input';
import { Button } from '@/components/ui/button';

import { type signInWithCredentialsResponse, signInWithCredentials, signInWithGoogle } from '@/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/schemas/user';

import { Jua } from 'next/font/google';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

const jua = Jua({
	subsets: ['latin'],
	weight: '400'
});

export default function Page(): JSX.Element {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement | null>(null);
	const [state, formAction] = useFormState(
		async (prev: signInWithCredentialsResponse, next: FormData): Promise<any> => {
			return await signInWithCredentials(prev, next);
		},
		{
			error: '',
			success: ''
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: zodResolver(userSchema) });

	useEffect(() => {
		console.log(state);
		if (state?.success === 'success') {
			router.push('/home');
		} else if (state.error !== '') {
			toast.error((state?.error as string) ?? 'Server Error', {
				duration: 3000,
				position: 'top-center',
				style: {
					color: 'red'
				}
			});
		}
	}, [state]);

	console.log(state);

	return (
		<main className={jua.className}>
			<div className=" grid place-items-center  w-[400px] mx-auto ">
				<div className="flex flex-col gap-2  mt-40 w-full">
					<div className="flex flex-col gap-2 w-full items-start px-14 py-7  rounded-md shadow-[0px_0px_3px_1px_black] ">
						<h1 className="text-3xl self-center mb-6 ">Sign In</h1>
						<form
							ref={formRef}
							action={async () => {
								await handleSubmit(() => {
									if (formRef.current !== null) formAction(new FormData(formRef.current));
								})();
							}}
							className="flex flex-col w-full ">
							<Input
								register={register}
								error={(errors?.email?.message as string) ?? ''}
								label="Email"
								name="email"
								type="text"></Input>
							<Input
								register={register}
								name="password"
								error={(errors?.password?.message as string) ?? ''}
								label="Password"
								type="password"></Input>

							<SignInWithCredentials />
						</form>
						{/* <CredentialsButton /> */}
						<span className="self-center">-- OR --</span>
						<Button className=" w-full">Sign in with Github</Button>
						<Button
							onClick={async () => {
								await signInWithGoogle();
							}}
							className="w-full mt-2 ">
							Sign in with Google
						</Button>
						<Link href={'/signup'} className="mt-6 ">
							Do not have an account? <span className="text-green-500 hover:underline">Sign up.</span>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

function SignInWithCredentials(): JSX.Element {
	const { pending } = useFormStatus();
	return (
		<Button disabled={pending} className="mt-4" type="submit">
			{pending ? 'Verifying...' : 'Sign in'}
			{pending ? <FaSpinner className=" ml-2 animate-spin"></FaSpinner> : null}
		</Button>
	);
}
