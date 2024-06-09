import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

export default async function Page(): Promise<JSX.Element> {
	const session = await auth();

	if (session === null) {
		return redirect('/signin');
	} else return redirect('/home');
}
