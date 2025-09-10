import dotenv from "dotenv";
dotenv.config();

export default {
    WEBHOOK_SECRET : process.env.WEBHOOK_SIGNING_SECRET,
    WEBHOOK_SECRET_ROLE : process.env.WEBHOOK_SIGNING_SECRET_ROLE_UPDATION,
    PORT : process.env.PORT,
    SUPABASE_URL : process.env.SUPABASE_URL,
    SUPABASE_KEY : process.env.SUPABASE_KEY,
}