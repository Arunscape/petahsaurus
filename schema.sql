drop table if exists findings;

create table findings (
  id int,
  words bytes,
  picture bytes,
  findingdate date,
  lat decimal,
  long decimal,
  primary key (id)
);