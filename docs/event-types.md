### List of all availble types for Ant.add

```ts
// Text message
Ant.add('message', status, (chat_id: Number, text: String, message_id: Number) => { ... })

// Location sharing
Ant.add('location', status, (chat_id: Number, location: TelegramLocation, mask?: String) => { ... })

// Photo message
Ant.add('photo', status, (chat_id: Number, photo: TelegramPhoto, mask?: String) => { ... })

// Contact sharing
Ant.add('contact', status, (chat_id: Number, contact: TelegramContact, mask?: String) => { ... })

// Pre checkout query
Ant.add('pre_checkout_query', status, (chat_id: Number, query: TelegramCheckoutQuery, mask?: String) => { ... })

// Successful payment info message
Ant.add('successful_payment', status, (chat_id: Number, payment: TelegramPayment, mask?: String) => { ... })

// Messages with callback query
Ant.add('callback_query', status, (chat_id: Number, data: any,  message_id: Number) => { ... })
```

