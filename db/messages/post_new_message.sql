insert into messages (
  message_text,
  message_time,
  is_group_message,
  author_id,
  recipient_id,
  channel_recipient
)
values (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6
);
