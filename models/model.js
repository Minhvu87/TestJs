const sqlite3 = require('sqlite3').verbose();

class Model {
    constructor() {
        this.db = new sqlite3.Database('./database.sqlite');
        this.init();
    }

    init() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `);

        this.db.run(`
            INSERT INTO data (name)
            VALUES ('John Doe'), ('Jane Smith'), ('Alice Brown')
        `, (err) => {
            if (!err) console.log("Sample data inserted!");
        });
    }

    fetchData(callback) {
        this.db.all(`SELECT * FROM data`, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = Model;
