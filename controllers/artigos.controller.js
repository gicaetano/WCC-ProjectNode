// regras de negocio do sistemas de artigos
const { response } = require("express");
const database = require("../models");
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
    .then(function () {
        res.send("Artigo criado com sucesso");
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao salvar o artigo");
    })       
};

// Retorna todos os artigos
exports.findAll = (req, res) => {
    tabelaArtigos.findAll()
    .then(function (data) {
        res.send(data);
    })
    .catch(function () {
        res.status(500).send("Ocorreu um erro ao buscar todos os artigos")
    });
}

exports.findByTitle = (req, res) => {
    tabelaArtigos.findOne({where: { titulo: req.query.titulo }})
    .then(function (data) {
        if(data) {
            res.send(data);
        } else {
            res
            .status(404)
            .send (
                {message: "Não foi possivel localizar arquivo com o titulo: " + req.query.titulo}
        );
        }
    }).catch(function () {
        res
        .status(500)
        .send({message: "Ocorreu um erro ao buscar o artigo com titulo: " + req.query.titulo}
        );
    });
};

// Retorna por ID 

exports.findById = (req, res) => {
    tabelaArtigos
    .findByPk(req.query.id)
    .then(function (data) {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message:"Não foi possivel encontrar artigo com o id: " + req.query.id
            });
        }
    })
    .catch(function (error) {
         res
         .status(500)
         .send({message: "Ocorreu um erro ao buscar o artigo com id: " + req.query.id}
         );
});
};