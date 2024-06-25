export const ERROR = {
	INVALID_CREDENTIALS: 'Invalid credentials',
	INVALID_EMAIL: 'Invalid email',
	INVALID_PASSWORD: 'Invalid password',
	INVALID_NAME: 'Invalid name',
	INVALID_AGE: 'Invalid age',
	EMAIL_EXISTS: 'Email already exists',
	USER_NOT_FOUND: 'User not found',
	SERVER_ERROR: 'Server error'
};

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
	}
}
