const socket = io('http://localhost:3000')
const senderContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userInfo = document.getElementById('user-info')

const name = prompt('What is your name?')
window.alert(`You Joined`);
setTimeout(() => {
  const alerts = document.querySelectorAll('.alert');
  alerts[alerts.length - 1].style.display = 'none';
}, 3000);
socket.emit('new-user', name)

socket.on('chat-message', data => {
  const message = `${data.name}: ${data.message}`
  if (data.sender) {
    appendSenderMessage(message)
  } else {
    appendReceiverMessage(message)
  }
})



socket.on('user-connected', name => {
  window.alert(`${name} online`);
  setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts[alerts.length - 1].style.display = 'none';
  }, 3000);
})

socket.on('user-disconnected', name => {
  window.alert(`${name} offline`);
  setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts[alerts.length - 1].style.display = 'none';
  }, 3000);
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendSenderMessage(`${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})
function appendMessage(name) {
  const messageElement = document.createElement('div')
  messageElement.innerText = name
  userInfo.append(messageElement)

}

function appendSenderMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList.add('sender')
  messageElement.dataset.sender = 'true'
  senderContainer.append(messageElement)
}

function appendReceiverMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList.add('receiver')
  messageElement.dataset.sender = 'false'
  senderContainer.append(messageElement)
}
