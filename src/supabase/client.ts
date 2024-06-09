import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

export const supabase = createClient<Database>(
	process.env.SUPABASE_PROJECT_URL ?? '',
	process.env.SUPABASE_PUBLIC ?? ''
);
