// regras de negocio do sistemas de artigos
const database = require("../models/index.js");
const tabelaArtigos = database.artigos;

//cria novo artigo
exports.create = (req, res) => {
    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado
    };

    //Promisses
    tabelaArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch(() => res.status(500).send("Ocorreu um erro ao salvar o artigo"))

    funcaoFormataArtigo();
};