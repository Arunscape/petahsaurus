create table IF NOT EXISTS findings (
  id int,
  words TEXT,
  picture bytes,
  findingdate date,
  lat decimal,
  long decimal,
  primary key (id)
);

create table IF NOT EXISTS tags (
  findingid int,
  k TEXT,
  v TEXT,
  FOREIGN KEY(findingid) REFERENCES findings(id),
  PRIMARY KEY(findingid, k)
);

create table IF NOT EXISTS users (
  username TEXT,
  email TEXT,
  validation TEXT,
  id INTEGER PRIMARY KEY AUTOINCREMENT
);

create table IF NOT EXISTS userdata (
  userid INTEGER,
  dataname TEXT,
  datavalue TEXT,
  FOREIGN KEY(userid) REFERENCES users(id)
);
