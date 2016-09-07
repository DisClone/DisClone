update messages set message_text = $1, is_edited = 'true' where id = $2;
