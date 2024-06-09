import { supabase } from '@/supabase/client';

export async function getResources(userId: string): Promise<any> {
	try {
		const data = await supabase.from('users').select().eq('id', userId).select();
		return data;
	} catch (error) {
		console.log('Error', error);
		return error;
	}
}
