create table IF NOT EXISTS findings (
  id string,
  userid TEXT,
  words TEXT,
  picture TEXT,
  findingdate int,
  lat decimal,
  long decimal,
  primary key (id),
  FOREIGN KEY(userid) REFERENCES users(id)
);

create table IF NOT EXISTS tags (
  findingid string,
  k TEXT,
  v TEXT,
  FOREIGN KEY(findingid) REFERENCES findings(id),
  PRIMARY KEY(findingid, k)
);

create table IF NOT EXISTS users (
  username TEXT,
  email TEXT,
  validation TEXT,
  id TEXT PRIMARY KEY
);

create table IF NOT EXISTS userdata (
  userid TEXT,
  dataname TEXT,
  datavalue TEXT,
  FOREIGN KEY(userid) REFERENCES users(id)
);
