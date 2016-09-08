-- UPDATED USERS SCHEMA 9/7

create table users (
  id serial primary key,
  username varchar(50),
  password varchar(300),
  email varchar(80),
  display_name varchar(40),
  avatar varchar(255)
);


-- UPDATE GROUPS SCHEMA 9/7
create table groups (
  id serial primary key,
  group_owner integer references users(id),
  group_image varchar(255),
  group_name varchar(40)
);

create table groups_users_relations (
  id serial primary key,
  user_id integer references users(id),
  group_id integer references groups(id)
);

-- UPDATE - CREATED CHANNELS TABLE 9/7-9/8
create table channels (
  id serial primary key,
  channel_name varchar(40),
  parent_group integer references groups(id),
  type varchar(12),
  private boolean,
  private_recipient1 integer references users(id),
  private_recipient2 integer references users(id)
)


-- UPDATED MESSAGES SCHEMA 9/7
create table messages (
  id serial primary key,
  message_text varchar(400),
  message_time varchar(40),
  is_group_message boolean,
  is_edited boolean,
  author_id integer references users(id),
  recipient_id integer references users(id),
  channel_recipient integer references channel(id)
);



create table test_msgs (
  id serial primary key,
  body varchar(300),
  author varchar(40)
);
