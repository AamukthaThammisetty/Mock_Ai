/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://postgres.wvvqfojskfvzrtworcjw:Aamuktha2005@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
  }
};
