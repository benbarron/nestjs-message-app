let socket = io('http://localhost:4000/message');
let username = null;
let users = [];
let messages = [];

while (username == null) {
  username = prompt('Please enter a username');
}

socket.on('new-message-to-client', data => {
   messages.push(data.message);
    rerenderMessages(); 
});

socket.on('all-messages-to-client', data => {
  messages = data;
  rerenderMessages();
});

socket.on('new-user-to-clients', data => {
  users.push(data);
});

document.querySelector('#message-button').addEventListener('click', e => {
  e.preventDefault();
  const message = document.querySelector('#message-input').value;
  socket.emit('new-message-to-server', { message, sender: username });
  document.querySelector('#message-input').value = '';
});

const getIncomingMessage = msg => {
  return `
    <div class="incoming_msg">
      <div class="received_msg">
        <div class="received_withd_msg">
        <span class="time_date">${msg.sender}</span>
          <p>${msg.message}</p>
        </div>
      </div>
    </div>
  `;
};

const getOutgoingMessage = msg => {
  return `
    <div class="outgoing_msg">
      <div class="sent_msg">
      <span class="time_date">${msg.sender}</span>
        <p>${msg.message}</p>
      </div>
    </div>
  `;
};

const rerenderMessages = () => {
  const parentEL = document.querySelector('.msg_history');
  var output = '';

  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
    if (messages[i].sender == username) {
      output += getOutgoingMessage(messages[i]);
    } else {
      output += getIncomingMessage(messages[i]);
    }
  }

  parentEL.innerHTML = output;
};

