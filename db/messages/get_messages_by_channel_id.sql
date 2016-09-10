select * from messages where channel_recipient = $1 and is_group_message = 'true';
