import * as pg from "pg";
import "dotenv/config";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString: `postgresql://postgres.gwjollgebjumbqkistsc:${process.env.PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
});

export default connectionPool;
