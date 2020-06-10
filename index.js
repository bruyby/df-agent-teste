const express = require('express');
const bodyparser = require('body-parser');
const buscaCep = require("busca-cep"); 

// Configuration
const app = express();
app.use(bodyparser.json());

app.post('/', (req,res)=>{
    res.send('Servidor em execuçao!!');
})

// Webhook route
// app.post('/webhook', (req, res) => {
//     const data = req.body;

// 	const response = {
// 		fulfillmentText: "Your webhook works fine !",
// 	}
// 	res.json(response);
// });

app.post("/Dialogflow", function(request, response){
    var intentName = request.body.queryResult.intent.displayName;
if (intentName == "cep") { 
    console.log('Executando serviso!')
    var CEP = request.body.queryResult.parameters['cep']; 
    buscaCep(CEP, { sync: false, timeout: 1000 }) 
    .then(endereco => { 
        var local = endereco.logradouro +" - "+ endereco.bairro +"\n"+ endereco.localidade +" - "+ endereco.uf +"\n"+ endereco.cep; 
    response.json({ "fulfillmentText" : "Ok, seu CEP está confirmado:" + "\n" + local}) 
})
} 
});

app.listen(3333,()=> console.log('Serviço excutando na porta 3333'));
