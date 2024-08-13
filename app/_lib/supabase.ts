import { createClient } from "@supabase/supabase-js";

if (typeof process.env.SUPABASE_URL === "undefined")
  throw new Error("The process.env.SUPABASE_URL is undefined");

if (typeof process.env.SUPABASE_KEY === "undefined")
  throw new Error("The process.env.SUPABASE_KEY is undefined");

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
