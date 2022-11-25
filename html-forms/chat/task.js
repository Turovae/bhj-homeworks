const chatWidget = document.querySelector('.chat-widget');
const chatWidgetMessagesContainer = chatWidget.querySelector('.chat-widget__messages-container');
const chatWidgetInput = chatWidget.querySelector('.chat-widget__input');
const chatWidgetMessages = chatWidget.querySelector('#chat-widget__messages');

let timeoutID;

// Окрытие чата
chatWidget.addEventListener('click', () => {
    chatWidget.classList.add('chat-widget_active');
});

// Закрытие чата
document.addEventListener('click', (event) => {
    if (event.target.closest('.chat-widget')) return;
    if (!chatWidget.classList.contains('chat-widget_active')) return;
    chatWidget.classList.remove('chat-widget_active');

    if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
    }
});

const robotMessages = [
    'Вы не купили ни одного нашего товара, чтобы так с нами разговаривать!',
    'Кто тут?',
    'Где ваша совесть?',
    'К сожалению, все операторы сейчас заняты. Не пишите нам больше!',
    'Добрый день! До свидания!',
    'Мы ничего не будем вам провдавать!',
    'Да скройся уже! Нам некогда, мы чай пьём.'
];



// Обработка нажатия клавиши Enter
document.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;

    const textMessage = chatWidgetInput.value;
    if (!textMessage) return;
    chatWidgetInput.value = '';

    addMessage(textMessage, chatWidgetMessages, '_client');
    scrollToEnd(chatWidgetMessagesContainer);

    if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
    }

    setTimeout(() => {
        addMessage(robotMessages[Math.floor(Math.random() * robotMessages.length)], chatWidgetMessages);
        addMessageTimeout();
    }, 1000);
    
    
});

// Добавление сообщения
const addMessage = (message, container, client = '') => {
    container.innerHTML += `
        <div class="message${client}">
            <div class="message__time">${new Date().toLocaleTimeString(['ru-RU'], {hour: '2-digit', minute: '2-digit'})}</div>
            <div class="message__text">${message}</div>
        </div>
    `;
    scrollToEnd(chatWidgetMessagesContainer);
};

// Прокрутка к последнему сообщению
const scrollToEnd = (element) => {
    element.scrollTop = element.scrollHeight - element.clientHeight; 
};

// Добавление сообщений робота при простое чата более 30 секунд.
const addMessageTimeout = () => {
    timeoutID = setTimeout(() => {
        addMessage(robotMessages[Math.floor(Math.random() * robotMessages.length)], chatWidgetMessages);
        addMessageTimeout();
    }, 30000);
};