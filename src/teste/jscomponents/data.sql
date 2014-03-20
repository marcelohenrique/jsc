-- dados de exemplo 
insert into 
	contatos (nome,endereco,telefone)
values 
	('Link','Hyrule','12345678'),
	('Alucard','Transilv�nia','12345678'),
	('Mario', 'Donut Plains', '96969696'),
	('Optimus', 'Cybertron', '12341234');

insert into
	country (nome)
values
	('Brasil'),
	('S�o Paulo (see exception)'),
	('Camboja'),
	('Caucaia');

insert into 
	state(cod_country,nome)
values
	((select codigo from country where nome = 'Brasil'),'Cear�'),
	((select codigo from country where nome = 'Brasil'),'Goi�s'),
	((select codigo from country where nome = 'Brasil'),'Sergipe'),
	((select codigo from country where nome = 'Brasil'),'S�o Paulo'),
	((select codigo from country where nome = 'Camboja'),'juujjujujuan'),
	((select codigo from country where nome = 'Camboja'),'ijijiajaijnin'),
	((select codigo from country where nome = 'Caucaia'),'Valinor');
	
insert into 
	city(cod_state,nome)
values
	((select codigo from state where nome = 'Cear�'),'Fortaleza'),
	((select codigo from state where nome = 'Cear�'),'Juazeiro'),
	((select codigo from state where nome = 'Cear�'),'Sobral'),
	((select codigo from state where nome = 'Goi�s'),'Barretos'),
	((select codigo from state where nome = 'S�o Paulo'),'S�o Paulo'),
	((select codigo from state where nome = 'S�o Paulo'),'Osasco'),
	((select codigo from state where nome = 'S�o Paulo'),'Carapicu�ba'),
	((select codigo from state where nome = 'juujjujujuan'),'giwongintin'),
	((select codigo from state where nome = 'juujjujujuan'),'giwontao'),
	((select codigo from state where nome = 'ijijiajaijnin'),'tawotungun'),
	((select codigo from state where nome = 'Valinor'),'Tiriton');
	