interface Session {
	user: User;
	iat: number;
}

interface User {
	username: string;
	id: string;
	expires: Date;
}
