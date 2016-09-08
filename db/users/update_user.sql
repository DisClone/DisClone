update users
  set username = $1, password = $2, email = $3, display_name = $4, avatar = $5
  where id = $6;
