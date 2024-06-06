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
const startLessonButton = document.querySelector('.js-start-lesson');
const tutorsButton = document.querySelector('.js-tutors');
const startVoiceControlButton = document.querySelector('.js-start-voice-control');
const voiceControlStatus = document.querySelector('.voice-control-status');

let recognition;

startVoiceControlButton.addEventListener('click', () => {
    if (!recognition) {
        initVoiceControl();
    }
    toggleVoiceControl();
});

function initVoiceControl() {
    recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
    });

    recognition.addEventListener('end', () => {
        toggleVoiceControl();
    });
}

function toggleVoiceControl() {
    if (recognition.state === 'listening') {
        recognition.stop();
        voiceControlStatus.style.display = 'none';
    } else {
        recognition.start();
        voiceControlStatus.style.display = 'block';
    }
}

function handleVoiceCommand(transcript) {
    if (transcript.includes('начать')) {
        startLessonButton.click();
    } else if (transcript.includes('репетиторы')) {
        tutorsButton.click();
    }
}
