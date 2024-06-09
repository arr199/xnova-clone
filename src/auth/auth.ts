import { options } from '@/app/api/auth/[...nextauth]/config';
import nextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = nextAuth(options);
