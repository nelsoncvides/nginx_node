import fetch from 'node-fetch';
import express from 'express';
import mysql from 'mysql';
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const url = 'https://randommer.io/api/Name?nameType=fullname&quantity=1';
var headers = {
    'X-Api-Key': '26e26bf59e76487bbc28b31e200168e0'
};


let nome = await fetch(url, { method: 'GET', headers: headers})
    .then((res) => {        
        return res.json()
    })

console.log(nome)

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) VALUES ('${nome}')`
connection.query(sql)

let lista_nomes = ''
connection.query("SELECT * FROM people", function (err, result, fields) {
    if (err) throw err;
    lista_nomes = result;
  });

connection.end()


app.get('/', (req, res) => {
    let full_cycle = '<h1>Full Cycle Rocks!</h1></ br>'
    res.send(full_cycle + lista_nomes.map((x) => '<h2>' + x.name)
    .join("</h2>"))
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})