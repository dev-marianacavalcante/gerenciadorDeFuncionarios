var mysql = require("mysql");
var connection = mysql.createConnection({
  localhost: "localhost",
  user: "user",
  password: "password",
  database: "db",
});

const createConnection = function () {
  connection.connect((error) => {
    if (error) {
      console.log("Erro na connexao!");
    } else {
      console.log("Conectado!");
    }
  });
};

function solicitarLista() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM funcionarios", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function inserirFuncionario(funcionario) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO funcionarios (nome, funcao, departamento, salario) VALUES ('" +
        funcionario.nome +
        "','" +
        funcionario.funcao +
        "','" +
        funcionario.departamento +
        "'," +
        funcionario.salario +
        ")",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function atualizarFuncionario(funcionario, id) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE funcionarios set nome='" +
      funcionario.nome +
      "'," +
      "funcao='" +
      funcionario.funcao +
      "'," +
      "departamento='" +
      funcionario.departamento +
      "'," +
      "salario= " +
      funcionario.salario +
      " where id=" +
      id;
    console.log("AQUI!!!", query);
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function removerFuncionario(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM funcionarios where id=" + id,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = {
  createConnection,
  solicitarLista,
  inserirFuncionario,
  atualizarFuncionario,
  removerFuncionario,
};
