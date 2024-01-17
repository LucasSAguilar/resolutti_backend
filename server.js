import express from "express";
import {
  realizarLogin,
  inserirNovoFuncionario,
  inserirNovaPessoa,
} from "./mysql.js";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

app.post(
  "/registrarFuncionarios",
  upload.single("imagem"),
  async (req, res) => {
    const { username, password, email, telefone } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ efetuado: false, message: "Imagem não fornecida" });
    }

    const caminhoImagem = req.file.path;

    try {
      const response = await inserirNovoFuncionario(
        username,
        password,
        caminhoImagem,
        telefone,
        email
      );
      res.json({ efetuado: response });
    } catch (e) {
      res.json({ efetuado: false, message: e.message });
    }
  }
);

app.get("/realizarLogin", async (req, res) => {
  try {
    const { username, senha } = req.query;
    const response = await realizarLogin(username, senha);
    res.json({ aprovado: response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

app.post("/registrarPessoa", async (req, res) => {
  const { dadosPessoais, enderecos, contatos } = req.body;

  try {
    const response = await inserirNovaPessoa(
      dadosPessoais,
      enderecos,
      contatos
    );
    res.json({ efetuado: response });
  } catch (e) {
    res.json({ efetuado: false, message: e.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});