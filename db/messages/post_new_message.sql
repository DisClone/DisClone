insert into messages (
  message_text,
  message_time,
  is_group_message,
  is_edited,
  author_id,
  recipient_id,
  channel_recipient
)
values (
  $1,
  $2,
  $3,
  'false',
  $4,
  $5,
  $6
);
