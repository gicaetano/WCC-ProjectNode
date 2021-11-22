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

    // _________ retorna arquivos publicados ou não
    router.get("/findAllPubli", artigosController.findAllPubli);

    // _________ Atualiza Arquivos 
    router.put("/:id", artigosController.update);

    router.put("/", artigosController.updateMany);

    //DELETE
    router.delete("/", artigosController.deleteAll);

    router.delete("/:id", artigosController.delete);

    

    app.use("/artigos", router);
};