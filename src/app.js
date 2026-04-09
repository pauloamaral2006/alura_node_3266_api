import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (error) =>
  console.log("Erro na conexão com o banco de dados", error),
);
conexao.once("open", () =>
  console.log("Conexão com o banco de dados estabelecida com sucesso"),
);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});
app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
});
app.get("/livros/:id", async (req, res) => {
  const livroEncontrado = await livro.findById(req.params.id);
  res.status(200).json(livroEncontrado);
});
app.post("/livros", async (req, res) => {
  const novoLivro = new livro(req.body);
  await novoLivro.save();
  res.status(201).json(novoLivro);
});
app.put("/livros/:id", async (req, res) => {
  const livroAtualizado = await livro.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.status(200).json(livroAtualizado);
});
app.delete("/livros/:id", async (req, res) => {
  const livroRemovido = await livro.findByIdAndDelete(req.params.id);
  res.status(200).json(livroRemovido);
});
export default app;
