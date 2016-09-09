insert into channels (
  channel_name,
  parent_group,
  type,
  private
)
values (
  $1,
  $2,
  $'group',
  'false'
)
