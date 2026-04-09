import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import router from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (error) =>
  console.log("Erro na conexão com o banco de dados", error),
);
conexao.once("open", () =>
  console.log("Conexão com o banco de dados estabelecida com sucesso"),
);

const app = express();
router(app);    

export default app;
