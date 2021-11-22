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
    

    if(!artigo.titulo) {
        return res.status(400).send("O artigo precisa conter ao menos o título definido")
    }

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
    if(!req.query.titulo) {
        res.status(400)
        .send (
            "Não foi possível buscar artigo pois o TÍTULO não foi informado"
        );
    }
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
    const { id: idArtigo } = req.query

    if(!idArtigo) {
        res.status(400)
        .send (
            "Não foi possível buscar artigo pois ID não foi informado"
        );
    }
    tabelaArtigos
    .findByPk(!idArtigo)
    .then(function (data) {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message:"Não foi possivel encontrar artigo com o id: " + idArtigo
            });
        }
    })
    .catch(function (error) {
         res
         .status(500)
         .send({message: "Ocorreu um erro ao buscar o artigo com id: " + idArtigo}
         );
});
};

// Retorna Status True e false
exports.findAllPubli = (req, res) => {
    if(!req.query.publicado) {
        res.status(400)
        .send (
            "Não foi possível buscar artigo pois status (true or false) não foi informado"
        );
    }
tabelaArtigos.findAll({where: { publicado: req.query.publicado }})
    .then(function (data) {
            res.send(data);
    })
    .catch(function () {
        res
        .status(500)
        .send("Ocorreu um erro na busca: ");
    });
};
    
// Atualizar 

exports.update = (req, res) => {
    const { body: updates } = req;
    const { id: idArtigo } = req.params;
    const query = { where: { id: idArtigo }, returning: true };

    tabelaArtigos
    .update(updates, query)
    .then(function (data) {

        const linhasAtualizadas = data[0];
      if (linhasAtualizadas === 0) {
        res
          .status(404)
          .send(
            "Não foi encontrado nenhum registro para ser atualizado a partir do id: " +
              idArtigo
          );
        } else {
            const artigosAtualizados = data[1];
            res.send(artigosAtualizados);
          }
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).send("Ocorreu um erro ao atualizar o arquivo");
        });
    };

    exports.updateMany = (req, res) => {
        const { body: updates } = req;
        const query = {
          returning: true,
          where: { descricao: "descrição do artigo" },
        };
      
        tabelaArtigos
          .update(updates, query)
          .then(function (data) {
            console.log(data);
            const linhasAtualizadas = data[0];
            if (linhasAtualizadas === 0) {
              res
                .status(404)
                .send("Não foi encontrado nenhum registro para ser atualizado");
            } else {
              const artigosAtualizados = data[1];
              res.send(artigosAtualizados);
            }
          })
          .catch(function (error) {
            res.status(500).send("Ocorreu um erro ao atualizar os artigos");
          });
      };


//DELETE ALL
exports.deleteAll = (request, response) => {
    tabelaArtigos
      .destroy({ where: {}, truncate: false })
      .then(function (itemsDeletados) {
        response.send("Foram deletados " + itemsDeletados + "artigos");
      })
      .catch(function (error) {
        response.status(500).send("Ocorreu um erro ao deletar os artigos");
      });
  };
  
  exports.delete = (request, response) => {
    const { id: idArtigo } = request.params;
    tabelaArtigos
      .destroy({ where: { id: idArtigo } })
      .then(function (itemsDeletados) {
        if (itemsDeletados === 0) {
          response.send("O item com ID " + idArtigo + "não foi encontrado");
        } else {
          response.send("Artigo " + idArtigo + "deletado com sucesso");
        }
      })
      .catch(function (error) {
        response
          .status(500)
          .send("Ocorreu um erro ao tentar deletar o artigo " + idArtigo);
      });
  };