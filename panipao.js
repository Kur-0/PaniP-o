//requições
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

//configuração do express (server pra pagina e postman)
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const port = 3000;

//configuração do servidor mongodb
//conecte o mongodb
mongoose.connect('mongodb://127.0.0.1:27017/panipao', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000  
})


//criando a model solicitada
const UsuarioSchema = new mongoose.Schema({
    
   email : {type :String, required : true },
   password : {type :String},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//roteamento padrão

app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password


    const usuario = new Usuario({
        email : email,
        password : password
    })

    try {
        const newUsuario = await usuario.save();

        res.json({error : null, msg : "Cadastro feito com sucesso", usuarioId : newUsuario._id});
    }
    catch(error){
        res.status(400).json({error});
    }
});

app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname + "/cadastrousuario.html")
})

//segunda model
const ProdutopaoSchema = new mongoose.Schema({
    
    id_produtopao : {type : Number, required : true },
    descricao : {type : String},
    tipo : {type : String},
    dataValidade : {type : Date},
    quantidadeEstoque : {type : Number},
 });
 
 const Produtopao = mongoose.model("Produtopao", ProdutopaoSchema);
 
 //roteamento padrão
 
 app.post("/cadastroprodutopao", async(req, res)=>{
     const id_produtopao = req.body.id_produtopao;
     const descricao = req.body.descricao;
     const tipo = req.body.tipo;
     const dataValidade = req.body.dataValidade;
     const quantidadeEstoque = req.body.quantidadeEstoque
 
 
     const produtopao = new Produtopao({
         id_produtopao : id_produtopao,
         descricao : descricao,
         tipo : tipo,
         dataValidade : dataValidade,
         quantidadeEstoque : quantidadeEstoque,
     })
 
     try {
         const newProdutopao = await produtopao.save();
 
         res.json({error : null, msg : "Cadastro feito com sucesso", produtopaoId : newProdutopao._id});
     }
     catch(error){
         res.status(400).json({error});
     }
 });
 
 app.get("/cadastroprodutopao", async(req, res)=>{
     res.sendFile(__dirname + "/cadastroprodutopao.html")
 })

 

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});


app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})
