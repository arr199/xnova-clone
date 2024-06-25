import { useEffect, useState } from 'react';
import type { Session, User } from '../../types';

export function useAuth(): any {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function getUser(): Promise<void> {
			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/getUser`);
			const data: Session = await res.json();

			console.log(data);
			setSession(data);
			setUser(data.user);
		}

		getUser().then().catch(console.error);
	}, []);

	function signOut(): void {
		fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signOut`).then().catch(console.error);
		setSession(null);
		setUser(null);
	}

	return { session, user, signOut };
}
