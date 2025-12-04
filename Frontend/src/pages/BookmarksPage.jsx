import React, { useEffect, useState } from "react";
import Bookmarks from "../components/bookmarks/bookmarks";
import { supabase } from "../lib/supabaseBrowser";

const API_BASE_URL = "http://localhost:5000/api/getBookmarks";

const BookmarksPage = () => {
  const [table, setTable] = useState([]);

  const getBookmarks = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("No user found or error:", error);
        return;
      }
      console.log(user);
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "userId": user.id }),
      });

      if (!res.ok) {
        throw new Error("Some error occurred");
      }

      const data = await res.json();
      console.log(data);
      setTable(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return <Bookmarks bookmarks_table={[table]} />;
};

export default BookmarksPage;