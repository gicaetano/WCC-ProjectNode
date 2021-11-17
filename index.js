const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", function(req, res) {
    res.send("Minha PRIMEIRA requisição");
});

app.get("/segunda", function(req, res) {
    res.send("Minha SEGUNDA requisição");
});


app.get("/com-parametros", function(req, res) {
    if (req.query.nome === "Gisele"){
        res.send("Gisele chamou requisição");
    }
    res.send("Com parametros funfa!!! Sabadou " + req.query.nome + req.query.sobrenome);
});

app.post("/meu-primeiro-post", function(req, res) {
    console.log(req.body)
    res.send("Meu post funciona");
});

app.put("/meu-primeiro-put/:id", function(req, res) {
    console.log(req.body, req.params.id)
    res.send("Meu put funciona");
});

app.delete("/meu-primeiro-delete/:id", function (req, res) {
    console.log(req.params.id);
    res.send("Meu delete funciona" + req.params.id);
})

app.listen(port, function() {
    console.log("Ouvindo a porta: ", port);
});