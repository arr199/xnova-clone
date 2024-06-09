import type { GoogleProfile } from 'next-auth/providers/google';
import { supabase } from '@/supabase/client';

export async function verifyGoogleUserInDatabase(profile: GoogleProfile): Promise<any> {
	try {
		const email = profile.email ?? '';
		// CHECK IF USER WITH THIS EMAIL EXISTS IN DATABASE
		const { data, error } = await supabase.from('users').select().eq('email', email).select();
		console.log('ERROR LOOKING FOR GOOGLE USER: ', error);

		// IF USER DOES NOT EXIST IN DATABASE
		if (data?.length === 0) {
			console.log('USER DOES NOT EXIST');

			const { data, error } = await supabase.from('users').insert({ email }).select();

			console.log('ERROR CREATING GOOGLE USER: ', error);

			console.log(profile)
            console.log('data form SUPABASE', data);
			
            return {
				id: data?.[0].id,
				name: profile.name,
				email: profile.email,
				image: profile.picture
			};
		}

		// IF USER EXIST
		else {
			console.log('USER EXISTS');

			return {
				id: data?.[0].id,
				name: profile.name,
				email: profile.email,
				image: profile.picture
			};
		}
	} catch (error) {
		console.log('Error', error);
		return null;
	}
}
