const { getConnection } = require("./mysql");
const connection = getConnection();

function realizarPagamento(pagamento) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO pagamentos (id_funcionario, data_pagamento, Valor) VALUES (" +
        pagamento.funcionario.id +
        ", now()," +
        pagamento.valor +
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

module.exports = {
  realizarPagamento,
};
