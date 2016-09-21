SELECT id
FROM users 
WHERE email = $1 OR username = $1 AND password = $2;
