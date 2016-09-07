create table users (
  id serial primary key,
  username varchar(50),
  password varchar(300)
);

create table groups (
  id serial primary key
);

create table groups_users_relations (
  id serial primary key,
  user_id integer references users(id),
  group_id integer references groups(id)
);


-- UPDATED MESSAGES SCHEMA 9/7
create table messages (
  id serial primary key,
  message_text varchar(400),
  message_time varchar(40),
  is_group_message boolean,
  is_edited boolean,
  author_id integer references users(id),
  recipient_id integer references users(id),
  group_recipient integer references groups(id)
);



create table test_msgs (
  id serial primary key,
  body varchar(300),
  author varchar(40)
);
