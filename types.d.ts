import type { Database } from './database.types';
interface Session {
	user: User;
	iat: number;
}

interface User {
	email: string;
	id: string;
	expires: Date;
}

type AllUserFields = Database['public']['Tables']['users']['Row'];
type ExcludedFields = 'id' | 'password' | 'created_at';
type SafeFieldsFromUsersTable = Omit<AllUserFields, ExcludedFields>;
