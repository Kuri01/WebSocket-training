const loginForm = document.getElementById('welcome-form');
const loginInput = document.getElementById('username');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

messagesSection.classList.remove('show');
const login = () => {
  if (loginInput.value === '') {
    alert('Form is empty!');
  } else {
    userName = loginInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login();
});

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = () => {
  if (userName && messageContentInput.value) {
    addMessage(userName, messageContentInput.value);
  } else {
    alert('Fulfill message box!');
  }

  messageContentInput.value = '';
};

addMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage();
});
