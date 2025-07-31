import express, { urlencoded } from "express";
import mainRoutes from "./Routes/MainRoutes.js";
import cors from "cors";
import { supabase } from "./Config/supabaseClient.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use(mainRoutes);

const checkSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log("database connected 😄");
  } catch (err) {
    console.log("Errror connecting to database", err.message);
  }
};

app.listen(5000, async () => {
  console.log("Unified server running on port 5000👍");
  await checkSupabase();
});
