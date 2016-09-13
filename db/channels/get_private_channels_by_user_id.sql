select * from channels where private_recipient1 = $1 or private_recipient2 = $1 and private = 'true';
