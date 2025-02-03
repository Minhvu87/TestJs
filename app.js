const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Thêm dòng này
const Controller = require('./controllers/controller');

const app = express();
const controller = new Controller();

// Sử dụng CORS middleware
app.use(cors());  // Thêm dòng này để cho phép yêu cầu từ các nguồn khác nhau

const db = new sqlite3.Database('database.sqlite'); // Kết nối SQLite

app.use(express.static('static'));

// Tạo bảng `data` nếu chưa tồn tại
db.run(`
    CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`);

app.get('/data', (req, res) => controller.getData(req, res));
// Endpoint POST để thêm dữ liệu
app.post('/add-data', (req, res) => {
  const names = req.body.names; // Lấy danh sách tên từ body

  if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of names.' });
  }

  const placeholders = names.map(() => '(?)').join(', ');
  const sql = `INSERT INTO data (name) VALUES ${placeholders}`;

  db.run(sql, names, function (err) {
      if (err) {
          return res.status(500).json({ error: 'Failed to insert data.' });
      }
      res.status(201).json({ message: 'Data added successfully!', insertedRows: this.changes });
  });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
