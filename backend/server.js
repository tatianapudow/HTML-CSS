// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Пример временного хранилища (вместо базы данных)
let posts = [];

// Получить все посты
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Добавить новый пост
app.post('/api/posts', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Пустой пост' });

  const newPost = {
    id: posts.length + 1,
    content,
    date: new Date().toISOString()
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
