interface Session {
	user: User;
	iat: number;
}

interface User {
	email: string;
	id: string;
	expires: Date;
}
