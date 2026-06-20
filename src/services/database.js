import * as SQLite from "expo-sqlite";

let db = null;

async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("chatapp.db");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        sender TEXT NOT NULL,
        recipient TEXT,
        timestamp TEXT NOT NULL
      );
    `);
    try {
      await db.execAsync(`ALTER TABLE messages ADD COLUMN recipient TEXT;`);
    } catch {
      // Existing installs already have this column after the first migration run.
    }
  }
  return db;
}

export const dbService = {
  async init() {
    await getDb();
  },

  async saveMessage(message) {
    const database = await getDb();
    await database.runAsync(
      `INSERT OR IGNORE INTO messages (id, text, sender, recipient, timestamp) VALUES (?, ?, ?, ?, ?);`,
      [
        message.id,
        message.text,
        message.sender,
        message.recipient,
        message.timestamp,
      ]
    );
  },

  async loadMessages(username, recipient) {
    const database = await getDb();
    const rows = await database.getAllAsync(
      `SELECT * FROM messages
       WHERE (sender = ? AND recipient = ?)
          OR (sender = ? AND recipient = ?)
       ORDER BY timestamp ASC;`,
      [username, recipient, recipient, username]
    );
    return rows;
  },

  async clearMessages() {
    const database = await getDb();
    await database.runAsync(`DELETE FROM messages;`);
  },
};
