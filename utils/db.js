import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { Logger } from 'sass';

const sql = neon("postgresql://postgres.wvvqfojskfvzrtworcjw:Aamuktha2005@aws-0-ap-south-1.pooler.supabase.com:6543/postgres");
export const db = drizzle(sql,{schema,logger:true});


