### List of all availble types for Ant.add

```ts
Ant.add(type: 'message', status: string, listener: (chat_id: Number, text: string, message_id: Number) => any): void;

Ant.add(type: 'successful_payment', status: string, listener: (chat_id: Number, successful_payment: Telegram.SuccessfulPayment, mask?: String) => any): void;

Ant.add(type: 'pre_checkout_query', status: string, listener: (chat_id: Number, successful_payment: Telegram.PreCheckoutQuery, mask?: String) => any): void;

Ant.add(type: 'callback_query', status: string, listener: (chat_id: Number, data: any, message_id: Number) => any): void;

Ant.add(type: 'animation', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'channel_chat_created', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'delete_chat_photo', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'group_chat_created', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'left_chat_member', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'migrate_from_chat_id', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'migrate_to_chat_id', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'new_chat_members', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'new_chat_photo', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'new_chat_title', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'edited_message', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'edited_message_text', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'edited_message_caption', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'passport_data', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'pinned_message', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'supergroup_chat_created', status: string, listener: (chat_id: Number, message: Telegram.Message, mask?: String) => any): void;

Ant.add(type: 'shipping_query', status: string, listener: (chat_id: Number, query: Telegram.ShippingQuery, mask?: String) => any): void;

Ant.add(type: 'inline_query', status: string, listener: (chat_id: Number, query: Telegram.InlineQuery, mask?: String) => any): void;

Ant.add(type: 'live_location', listener: (chat_id: Number, location: Telegram.Location) => any): void;

Ant.add(type: 'audio', status: string, listener: (chat_id: Number, audio: Telegram.Audio, mask?: String) => any): void;

Ant.add(type: 'contact', status: string, listener: (chat_id: Number, contact: Telegram.Contact, mask?: String) => any): void;

Ant.add(type: 'document', status: string, listener: (chat_id: Number, document: Telegram.Document, mask?: String) => any): void;

Ant.add(type: 'game', status: string, listener: (chat_id: Number, game: Telegram.Game, mask?: String) => any): void;

Ant.add(type: 'invoice', status: string, listener: (chat_id: Number, invoice: Telegram.Invoice, mask?: String) => any): void;

Ant.add(type: 'location', status: string, listener: (chat_id: Number, location: Telegram.Location, mask?: String) => any): void;

Ant.add(type: 'photo', status: string, listener: (chat_id: Number, photo: Telegram.PhotoSize[], mask?: String) => any): void;

Ant.add(type: 'sticker', status: string, listener: (chat_id: Number, sticker: Telegram.Sticker, mask?: String) => any): void;

Ant.add(type: 'text', status: string, listener: (chat_id: Number, text: String, mask?: String) => any): void;

Ant.add(type: 'video', status: string, listener: (chat_id: Number, video: Telegram.Video, mask?: String) => any): void;

Ant.add(type: 'video_note', status: string, listener: (chat_id: Number, video_note: Telegram.Video, mask?: String) => any): void;

Ant.add(type: 'voice', status: string, listener: (chat_id: Number, voice: Telegram.Voice, mask?: String) => any): void;
```

