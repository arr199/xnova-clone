import type { GitHubProfile } from 'next-auth/providers/github';
import { supabase } from '@/supabase/client';

export async function verifyGithubUserInDatabase(profile: GitHubProfile): Promise<any> {
	try {
		const email = profile.email ?? '';
		// CHECK IF USER WITH THIS EMAIL EXISTS IN DATABASE
		const { data, error } = await supabase.from('users').select().eq('email', email).select();
		console.log('ERROR LOOKING FOR GITHUB USER: ', error);

		// IF USER DOES NOT EXIST IN DATABASE
		if (data?.length === 0) {
			console.log('USER DOES NOT EXIST');

			const { data, error } = await supabase.from('users').insert({ email }).select();
			console.log('ERROR', error);

			return {
				id: data?.[0].id,
				name: profile.name,
				email: profile.email,
				image: profile.avatar_url,
              
			};
		}

		// IF USER EXIST
		else {
			console.log('USER EXISTS');

		
		}
	} catch (error) {
		console.log('Error', error);
		return null;
	}
}
