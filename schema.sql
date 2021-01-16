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
