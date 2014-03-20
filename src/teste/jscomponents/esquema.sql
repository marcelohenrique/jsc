-- tabelas do exmeplo da agenda
drop table if exists contatos;

create table contatos(
	id int not null auto_increment,
	nome varchar(255) not null,
	endereco varchar(255) not null,
	telefone varchar(255) not null,
	
	primary key(id)
);

-- tabelas do exemplo dos combos
drop table if exists country;
drop table if exists state;
drop table if exists city;

create table country(
	codigo int not null auto_increment,
	nome varchar(255) not null,
	
	primary key(codigo)
);

create table state(
	codigo int not null auto_increment,
	cod_country int not null,
	nome varchar(255) not null,
	
	primary key(codigo),
	foreign key(cod_country) references country(codigo)
);

create table city(
	codigo int not null auto_increment,
	cod_state int not null,
	nome varchar(255) not null,
	
	primary key(codigo),
	foreign key(cod_state) references state(codigo)
);

-- exemplo do bate-papo
create table talk (
	codigo int not null auto_increment,
	data datetime not null,
	mensagem varchar(255) not null,
	
	primary key(codigo)
);