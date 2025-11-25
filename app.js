const express = require('express');
const app = express();
const PORT = 3000;

// ISSO AQUI SUBSTITUI O "GET" DA PÁGINA INICIAL
// Ele serve o index.html, o style.css e o script.js automaticamente
app.use(express.static('public')); 

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});