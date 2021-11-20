// rotas do sistemas de arquivos

/* 
    GET 
        - obter todos os artigos
        - obter um artigo especifico
        - obter todos os artigos publicados

    POST
        - criar um novo artigos
        
    PUT
        - criar um novo arquivo
    
    DELETE
        - deletar um artigo
*/

module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.post("/", artigosController.create);

// --------- retorna todos
    router.get("/", artigosController.findAll);
    
    // --------- retorna pelo titulo
    router.get("/findByTitle", artigosController.findByTitle);

    // --------- retorna pelo id
    router.get("/findById", artigosController.findById);
    
    
    app.use("/artigos", router);
};