import mysql from "mysql2/promise";

const config = {
  database: "formulario_teste_resoluti",
  host: "localhost",
  user: "root",
  password: "1234",
};

const buscarUsuarios = async () => {
  const conexao = await mysql.createConnection(config);
  try {
    const [dados, fields] = await conexao.query("SELECT * FROM funcionarios");
    return dados;
  } catch (e) {
    console.log(e);
  } finally {
    await conexao.end();
  }
};

const realizarLogin = async (username, senha) => {
  const conexao = await mysql.createConnection(config);

  try {
    const [dados, fields] = await conexao.query(
      "SELECT * FROM funcionarios WHERE usuario = ? AND senha = ?",
      [username, senha]
    );

    const isValid = dados.length >= 1;

    return isValid;
  } catch (e) {
    console.error(e);
    return false;
  } finally {
    await conexao.end();
  }
};

const inserirNovoFuncionario = async (
  username,
  senha,
  imagem,
  telefone,
  email
) => {
  const conexao = await mysql.createConnection(config);

  try {
    const [dados, fields] = await conexao.query(
      "INSERT INTO funcionarios (usuario, senha, imagem, telefone, email) VALUES (?, ?, ?, ?, ?)",
      [username, senha, imagem, telefone, email]
    );

    const isValid = dados.affectedRows === 1;

    return isValid;
  } catch (e) {
    console.error(e);
    return false;
  } finally {
    await conexao.end();
  }
};

const inserirNovaPessoa = async (dadosPessoais, enderecos, contatos) => {
  const conexao = await mysql.createConnection(config);

  try {
    const [resultDadosPessoais] = await conexao.query(
      "INSERT INTO dadosPessoais (nome, sobrenome, nascimento, email, cpf, rg) VALUES (?, ?, ?, ?, ?, ?)",
      [
        dadosPessoais.nome,
        dadosPessoais.sobrenome,
        dadosPessoais.nascimento,
        dadosPessoais.email,
        dadosPessoais.cpf,
        dadosPessoais.rg,
      ]
    );

    const idDadosPessoais = resultDadosPessoais.insertId;

    for (const endereco of enderecos) {
      await conexao.query(
        "INSERT INTO enderecos (logradouro, numero, cep, complemento, cidade, estado, idDadosPessoais) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          endereco.logradouro,
          endereco.numero,
          endereco.cep,
          endereco.complemento,
          endereco.cidade,
          endereco.estado,
          idDadosPessoais,
        ]
      );
    }

    for (const contato of contatos) {
      await conexao.query(
        "INSERT INTO contatos (nome, contato, tipoContato, idDadosPessoais) VALUES (?, ?, ?, ?)",
        [contato.nome, contato.contato, contato.tipoContato, idDadosPessoais]
      );
    }

    return true;
  } catch (e) {
    console.error("Ocorreu um erro: ", e);
    return false;
  } finally {
    await conexao.end();
  }
};

export { realizarLogin, inserirNovoFuncionario, inserirNovaPessoa };
