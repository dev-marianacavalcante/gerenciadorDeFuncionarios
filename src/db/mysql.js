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

function getConnection() {
  return connection;
}

module.exports = {
  getConnection,
  createConnection,
};
