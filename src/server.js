const fastify = require("fastify")({});
const { createConnection } = require("./db/mysql");
const {
  solicitarLista,
  inserirFuncionario,
  atualizarFuncionario,
  removerFuncionario,
} = require("./db/tabela-funcionarios");
const { realizarPagamento } = require("./db/tabela-pagamentos");

createConnection();

fastify.get("/funcionarios", async (req, res) => {
  const lista = await solicitarLista();
  res.send({ listaDeFuncionarios: lista }).status(200);
});

fastify.post("/funcionarios", async (req, res) => {
  await inserirFuncionario(req.body);
  res.send({ status: 201 });
});

fastify.put("/funcionario/:id", async (req, res) => {
  const id = req.params.id;
  const funcionario = req.body;
  await atualizarFuncionario(funcionario, id);

  res.send({});
});

fastify.delete("/funcionario/:id", async (req, res) => {
  const id = req.params.id;
  await removerFuncionario(id);

  res.send({});
});

fastify.post("/pagamento", async function (req, res) {
  const { id, valor } = req.body;
  await realizarPagamento({
    funcionario: {
      id,
    },
    valor: valor,
  });

  res.send({});
});

fastify.listen({ port: 3000 }),
  function (err, address) {
    if (err) {
      fastify.log.error(err);
    } else {
      console.log("running" + address);
    }
  };
