use backendEleitoral;

	CREATE TABLE IF NOT EXISTS partidos (
    id  INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    codigo INT NOT NULL UNIQUE ,
	nome VARCHAR(255) NOT NULL,
	sigla VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS candidato (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL UNIQUE,
            tituloEleitoral VARCHAR(20) NOT NULL,
            nome VARCHAR(100) NOT NULL,
            endereco VARCHAR(100),
            numero INT,
            bairro VARCHAR(50),
            cidade VARCHAR(50),
            uf CHAR(2),
            cep VARCHAR(9),
            rendaMensal DECIMAL(10,2),
            filiacao VARCHAR(10) NOT NULL,
            FOREIGN KEY (filiacao) REFERENCES partidos(sigla)  
            ON DELETE CASCADE
            ON UPDATE CASCADE
        )