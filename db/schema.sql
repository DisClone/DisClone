-- UPDATED USERS SCHEMA 9/7

create table users (
  id serial primary key,
  username varchar(50),
  password varchar(300),
  email varchar(80),
  display_name varchar(40),
  avatar varchar(255)
);


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

create table channels (
  id serial primary key,
  channel_name varchar(40),
  parent_group integer references groups(id),
  type varchar(12),
  private boolean,
  private_recipient1 integer references users(id),
  private_recipient2 integer references users(id)
);


create table messages (
  id serial primary key,
  message_text varchar(400),
  message_time varchar(40),
  is_group_message boolean,
  is_edited boolean,
  author_id integer references users(id),
  recipient_id integer references users(id),
  channel_recipient integer references channels(id)
);



create table test_msgs (
  id serial primary key,
  body varchar(300),
  author varchar(40)
);


---------------- DUMMY DATA, INSERT FOR FREE ------------------

insert into users (
  username,
  password,
  email,
  display_name,
  avatar
)
values (
  'craig_walker',
  'password',
  'craig.walker1123@gmail.com',
  'the_craig',
  'http://vignette4.wikia.nocookie.net/avatar/images/f/f0/Iroh.png/revision/latest?cb=20130102095611'
);

insert into users (
  username,
  password,
  email,
  display_name,
  avatar
)
values (
  'semo',
  'password',
  'semo@gmail.com',
  'semo',
  'http://i2.mirror.co.uk/incoming/article7450963.ece/ALTERNATES/s615/Daisy-Ridley.jpg'
);

insert into users (
  username,
  password,
  email,
  display_name,
  avatar
)
values (
  'john_cena',
  'password',
  'johncena@johncena.com',
  'JOHN_CENA',
  'http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/wwe_profiles_hero_cena_3.jpg?itok=ICL6JoxZ'
);


insert into groups (
  group_owner,
  group_image,
  group_name
)
values (
  1,
  'http://ih0.redbubble.net/image.88099330.9518/flat,800x800,075,t.u1.jpg',
  'Fire Nation'
);

insert into groups (
  group_owner,
  group_image,
  group_name
)
values (
  3,
  'http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/wwe_profiles_hero_cena_3.jpg?itok=ICL6JoxZ',
  'John Cena Fanclub'
);

insert into groups_users_relations (
  user_id,
  group_id
)
values (
  1,
  1
);

insert into groups_users_relations (
  user_id,
  group_id
)
values (
  2,
  1
);

insert into groups_users_relations (
  user_id,
  group_id
)
values (
  2,
  2
);

insert into groups_users_relations (
  user_id,
  group_id
)
values (
  3,
  2
);

insert into channels (
  channel_name,
  parent_group,
  type,
  private
)
values (
  'general',
  1,
  'text',
  'false'
);

insert into channels (
  channel_name,
  parent_group,
  type,
  private
)
values (
  'general',
  2,
  'text',
  'false'
);

insert into channels (
  type,
  private,
  private_recipient1,
  private_recipient2
)
values (
  'text',
  'true',
  1,
  2
);
