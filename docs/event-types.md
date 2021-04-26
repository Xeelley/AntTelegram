### List of all availble types for Ant.add

```ts
Ant.add(type: 'message', status: string, listener: (chat_id: number, text: string, message_id: number) => any): void;

Ant.add(type: 'successful_payment', status: string, listener: (chat_id: number, successful_payment: Telegram.SuccessfulPayment, mask?: string) => any): void;

Ant.add(type: 'pre_checkout_query', status: string, listener: (chat_id: number, successful_payment: Telegram.PreCheckoutQuery, mask?: string) => any): void;

Ant.add(type: 'callback_query', status: string, listener: (chat_id: number, data: any, message_id: number) => any): void;

Ant.add(type: 'animation', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'channel_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'delete_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'group_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'left_chat_member', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'migrate_from_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'migrate_to_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'new_chat_members', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'new_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'new_chat_title', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'edited_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'edited_message_text', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'edited_message_caption', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'passport_data', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'pinned_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'supergroup_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;

Ant.add(type: 'shipping_query', status: string, listener: (chat_id: number, query: Telegram.ShippingQuery, mask?: string) => any): void;

Ant.add(type: 'inline_query', status: string, listener: (chat_id: number, query: Telegram.InlineQuery, mask?: string) => any): void;

Ant.add(type: 'live_location', listener: (chat_id: number, location: Telegram.Location) => any): void;

Ant.add(type: 'audio', status: string, listener: (chat_id: number, audio: Telegram.Audio, mask?: string) => any): void;

Ant.add(type: 'contact', status: string, listener: (chat_id: number, contact: Telegram.Contact, mask?: string) => any): void;

Ant.add(type: 'document', status: string, listener: (chat_id: number, document: Telegram.Document, mask?: string) => any): void;

Ant.add(type: 'game', status: string, listener: (chat_id: number, game: Telegram.Game, mask?: string) => any): void;

Ant.add(type: 'invoice', status: string, listener: (chat_id: number, invoice: Telegram.Invoice, mask?: string) => any): void;

Ant.add(type: 'location', status: string, listener: (chat_id: number, location: Telegram.Location, mask?: string) => any): void;

Ant.add(type: 'photo', status: string, listener: (chat_id: number, photo: Telegram.PhotoSize[], mask?: string) => any): void;

Ant.add(type: 'sticker', status: string, listener: (chat_id: number, sticker: Telegram.Sticker, mask?: string) => any): void;

Ant.add(type: 'text', status: string, listener: (chat_id: number, text: string, mask?: string) => any): void;

Ant.add(type: 'video', status: string, listener: (chat_id: number, video: Telegram.Video, mask?: string) => any): void;

Ant.add(type: 'video_note', status: string, listener: (chat_id: number, video_note: Telegram.Video, mask?: string) => any): void;

Ant.add(type: 'voice', status: string, listener: (chat_id: number, voice: Telegram.Voice, mask?: string) => any): void;
```

