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

if (path.includes('index.html')) {
  loadPosts();
  setupNewPostForm();
}

if (path.includes('profile.html')) {
  loadProfileData();
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

if (path.includes('user_posts.html')) {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');
  loadUserPosts(userId);
}

if (path.includes('gallery.html')) {
  loadGallery();
  setupUploadForm();
}

if (path.includes('my_music.html')) {
  loadMusic();
  setupPlayer();
}

if (path.includes('friends.html')) {
  loadFriends();
  setupFriendActions();
}

// Загружаем список друзей из localStorage
let friends = JSON.parse(localStorage.getItem('friends')) || ["Ника", "Соня", "Милен"];
const list = document.getElementById('friendsList');
const input = document.getElementById('newFriend');
const addBtn = document.getElementById('addFriendBtn');

function renderFriends() {
  list.innerHTML = '';
  friends.forEach((name, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${name} <button class="delete-btn">Удалить</button>`;
    li.querySelector('.delete-btn').addEventListener('click', () => {
      friends.splice(index, 1);
      saveAndRender();
    });
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('friends', JSON.stringify(friends));
  renderFriends();
}

addBtn.addEventListener('click', () => {
  const name = input.value.trim();
  if (name) {
    friends.push(name);
    input.value = '';
    saveAndRender();
  }
});

// при загрузке страницы
renderFriends();