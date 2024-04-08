const fastify = require("fastify")({});
const {
  createConnection,
  solicitarLista,
  inserirFuncionario,
  atualizarFuncionario,
  removerFuncionario,
} = require("./db/mysql");

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

fastify.listen({ port: 3000 }),
  function (err, address) {
    if (err) {
      fastify.log.error(err);
    } else {
      console.log("running" + address);
    }
  };
