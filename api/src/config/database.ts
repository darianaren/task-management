import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

export const connectDB = async (): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      labels TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'in-progress')),
      labels TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
  return db;
};
