
CREATE DATABASE IF NOT EXISTS formulario_teste_resoluti;

USE formulario_teste_resoluti;

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    imagem VARCHAR(255),
    usuario VARCHAR(255),
    senha VARCHAR(255),
	email VARCHAR(255),
    telefone VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dadosPessoais (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    sobrenome VARCHAR(255),
    nascimento DATE,
    email VARCHAR(255),
    cpf VARCHAR(20),
    rg VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS enderecos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    logradouro VARCHAR(255),
    numero VARCHAR(10),
    cep VARCHAR(10),
    complemento VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2),
    IdDadosPessoais INT,
    FOREIGN KEY (IdDadosPessoais) REFERENCES dadosPessoais(id)
);

CREATE TABLE IF NOT EXISTS contatos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    contato VARCHAR(20),
    tipoContato VARCHAR(50),
    IdDadosPessoais INT,
    FOREIGN KEY (IdDadosPessoais) REFERENCES dadosPessoais(id)
);



