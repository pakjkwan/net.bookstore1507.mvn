/*테이블*/
create table Foo (bar varchar2(10));
select * from tab;
drop table Foo;

/*데이터*/
insert into Foo(bar) values('bar');
select * from Foo;
update Foo set bar = '홍길동' where seq = 10;


/*컬럼*/
alter table Foo add bar varchar2(10);
alter table Foo modify (bar varchar2(10));
alter table Foo drop column bar;
alter table Foo rename column bar to baz;