// frontend/script.js
const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const postsSection = document.getElementById('posts');

async function loadPosts() {
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();
  postsSection.innerHTML = posts.map(p => `
    <div class="post">
      <p>${p.content}</p>
      <span>${new Date(p.date).toLocaleString()}</span>
    </div>
  `).join('');
}

postForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = postContent.value.trim();
  if (!content) return alert("Пост не может быть пустым!");

  await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  postContent.value = '';
  loadPosts();
});

// Загружаем посты при открытии страницы
loadPosts();
