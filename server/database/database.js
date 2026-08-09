// Import SQLite
import sqlite3 from "sqlite3";

sqlite3.verbose();//help debugging

//Create wardrobe database
const db = new sqlite3.Database("./database/wardrobe.db", (err) => {

  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }

});

//create clothing table if doesn't exist
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS clothing (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      filename TEXT NOT NULL,

      type TEXT NOT NULL,

      minTemp INTEGER NOT NULL,

      maxTemp INTEGER NOT NULL

    )
  `);

});

export default db;