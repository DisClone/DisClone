select messages.id, messages.message_text, messages.message_time, messages.is_group_message, messages.is_edited, messages.author_id, messages.recipient_id, messages.channel_recipient, users.username, users.display_name, users.avatar, users.email, users.online from messages
join users on users.id = messages.author_id;
