import express, { urlencoded } from "express";
import mainRoutes from "./Routes/MainRoutes.js";
import cors from "cors";
import { supabase } from "./Config/supabaseClient.js";
import chalk from 'chalk'

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use(mainRoutes);

const time = new Date

const checkSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log(`database connected at ${chalk.blue(time)}😄`);
  } catch (err) {
    console.log("Errror connecting to database", err.message);
  }
};

app.listen(5000, async () => {
  {
    console.log(`Unified server running on port ${chalk.bgYellow(5000)}👍`);
    await checkSupabase();
  }
});
