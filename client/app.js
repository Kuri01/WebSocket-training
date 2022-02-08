const loginForm = document.getElementById('welcome-form');
const loginInput = document.getElementById('username');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

const socket = io({
  autoConnect: false,
});
socket.connect('localhost:8000');
socket.on('message', ({ author, content, contentType }) =>
  addMessage(author, content, contentType)
);
socket.on('leftChat', ({ author, content, contentType }) =>
  addMessage(author, content, contentType)
);

messagesSection.classList.remove('show');
const login = () => {
  if (loginInput.value === '') {
    alert('Form is empty!');
  } else {
    userName = loginInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('login', { user: loginInput.value });
  }
};

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login();
});

const addMessage = (author, content, contentType) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName && contentType === 'clientMessage')
    message.classList.add('message--self');
  if (contentType === 'botMessage') {
    message.classList.add('message--bot');
    message.innerHTML = `
    <h3 class="message__author bot">${author}</h3>
    <div class="message__content bot">
      ${content}
    </div>
  `;
  } else if (contentType === 'clientMessage') {
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  }

  messagesList.appendChild(message);
};

const sendMessage = (event) => {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('You have to type something!');
  } else {
    addMessage(userName, messageContent, 'clientMessage');
    socket.emit('message', {
      author: userName,
      content: messageContent,
    });
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(event);
});
