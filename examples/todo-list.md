# Todo List Bot

## Features
- Add card
- Show card list
- Mark card as `completed` and `uncompleted`

## Usage
Define your Ant:Telegram instance and paste code from [todo-list.js](todo-list.js):

```js
const cards = [];

const showMenu = async chat_id => {
    await Ant.status(chat_id, 'menu');
    await Ant.api.sendMessage(chat_id, 'TODO-list menu:', Ant.Types.Keyboard([
        ['➕ Add card', '📜 Show cards'],
    ]));
}

const askCardName = async chat_id => {
    await Ant.status(chat_id, 'card:name');
    await Ant.api.sendMessage(chat_id, 'Enter card name:', Ant.Types.Keyboard([
        ['To Menu'],
    ]))
}

const showCardList = async chat_id => {
    if (cards.length === 0) return await Ant.api.sendMessage(chat_id, 'No cards yet!');
    for(let i in cards) {
        await Ant.api.sendMessage(chat_id, `*${i + 1}.* ${cards[i].text} ${cards[i].completed ? '✅' : '❌'}`, 
        Ant.Types.InlineKeyboard([[ cards[i].completed 
            ? Ant.Types.InlineButton('Cancel', 'card:cancel', i)
            : Ant.Types.InlineButton('Submit', 'card:submit', i)
        ]]))
    }
}

Ant.command('/start', showMenu);

Ant.add('message', 'menu', (chat_id, text) => {
    if (text === '➕ Add card') return askCardName(chat_id);
    if (text === '📜 Show cards') return showCardList(chat_id);
})

Ant.add('message', 'card:name', async (chat_id, text) => {
    if (text !== 'To Menu') {
        cards.push({ text, completed: false });
        await Ant.api.sendMessage(chat_id, `"*${text}*" added`, { parse_mode: 'Markdown' });
    }
    showMenu(chat_id);
})

Ant.add('callback_query', 'card:cancel', (chat_id, index, message_id) => {
    cards[index].completed = false;
    Ant.api.editMessageText(`*${index + 1}.* ${cards[index].text} ❌`, Object.assign(
        Ant.Types.InlineKeyboard([[ Ant.Types.InlineButton('Submit', 'card:submit', index) ]]), { chat_id, message_id }
    ));
})

Ant.add('callback_query', 'card:submit', (chat_id, index, message_id) => {
    cards[index].completed = true;
    Ant.api.editMessageText(`*${index + 1}.* ${cards[index].text} ✅`, Object.assign(
        Ant.Types.InlineKeyboard([[ Ant.Types.InlineButton('Cancel', 'card:cancel', index) ]]), { chat_id, message_id }
    ));
})
```