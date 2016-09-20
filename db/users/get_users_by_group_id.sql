select users.avatar, users.display_name, users.id as user_id from users
join groups_users_relations
on groups_users_relations.user_id = users.id
where groups_users_relations.group_id = $1;
