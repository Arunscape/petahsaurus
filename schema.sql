drop table if exists findings;

create table findings (
  id int,
  words TEXT,
  picture bytes,
  findingdate date,
  lat decimal,
  long decimal,
  primary key (id)
);

create table users (
  username TEXT,
  email TEXT,
  id INTEGER PRIMARY KEY AUTOINCREMENT
);

create table userdata (
  userid INTEGER,
  dataname TEXT,
  datavalue TEXT,
  FOREIGN KEY(userid) REFERENCES user(id)
)
