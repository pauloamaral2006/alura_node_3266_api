import { stat } from "node:fs";
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao listar livros` });
    }
  }
  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao listar livro` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: autorEncontrado };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    const id = req.params.id;
    const livroAtualizar = req.body;

    try {
      let livroCompleto = { ...livroAtualizar };

      if (livroAtualizar.autor) {
        const autorEncontrado = await autor.findById(livroAtualizar.autor);

        livroCompleto = { ...livroCompleto, autor: autorEncontrado };
      }
      const livroAtualizado = await livro.findByIdAndUpdate(id, livroCompleto);
      res.status(200).json({
        message: "Livro atualizado com sucesso",
        livro: livroAtualizado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar livro` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      const livroRemovido = await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir livro` });
    }
  }

  static async listarLivroPorEditora(req, res) {
    try {
      const editora = req.query.editora;
      const livrosEncontrados = await livro.find({ editora: editora });
      res.status(200).json(livrosEncontrados);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao listar livro por editora` });
    }
  } 
}

export default LivroController;
