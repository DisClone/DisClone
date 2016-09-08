insert into channels (
  type,
  private,
  private_recipient1,
  private_recipient2
)
values (
  'private',
  'true',
  $1,
  $2
)
