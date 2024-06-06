const chatToggleBtn = document.querySelector('.chat-toggle-btn');
const chatWindow = document.querySelector('.chat-window');
const chatInputField = document.querySelector('.chat-input-field');
const chatSendBtn = document.querySelector('.chat-send-btn');
const chatMessages = document.querySelector('.chat-messages');

chatToggleBtn.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
});

chatInputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

chatSendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const message = chatInputField.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('chat-message');
        chatMessages.appendChild(messageElement);
        chatInputField.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const autoResponseElement = document.createElement('div');
            autoResponseElement.textContent = 'Техподдержка недоступна. Приносим свои извинения.';
            autoResponseElement.classList.add('chat-message', 'auto-response');
            chatMessages.appendChild(autoResponseElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }
}