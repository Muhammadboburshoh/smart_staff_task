insert into users(role, username, password, full_name) values
(1, 'muhammad', crypt('1122', gen_salt('bf')), 'Muhammadbobur Sharofov');
