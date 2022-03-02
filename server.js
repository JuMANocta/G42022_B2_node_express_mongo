const express = require('express')
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const urlDB = "mongodb://localhost:27017"
const client = new MongoClient(urlDB)
const app = express();
let db, voyage, frais

//? méthode POST http://localhost/voyage?name=madrid
app.post('/voyage',(req, res, next) => {
    const name = req.query.name
    voyage.insertOne({name : name},(err, result) => {
        if(err){
            console.error(err)
            res.status(500).json({err : err})
            return next()
        }
        console.log(result)
        res.status(200).json({ok : true})
        
    })
})
app.get('/voyage',(req, res, next) => {
    voyage.find().toArray((err, items)=>{
        if(err){
            console.error(err)
            res.status(500).json({err : err})
            return next()
        }
        res.status(200).json({voyage : items})
    })
})
//? méthode POST http://localhost/frais?voyage=madrid&date=02032022&amont=1000&category=perso&description=cool
app.post('/frais',(req, res, next) =>{
    frais.insertOne({
        voyage : req.query.voyage,
        date: req.query.date,
        amout: req.query.amout,
        category: req.query.category,
        description: req.query.description
    },
    (err, result) =>{
        if(err){
            console.error(err)
            res.status(500).json({err : err})
            return next()
        }},
        res.status(200).json({ok : true})
    )
})
app.get('/frais',(req, res, next) =>{
    frais.find({voyage : req.query.voyage}).toArray((err, items)=>{
        if(err){
            console.error(err)
            res.status(500).json({err : err})
            return next()
        }
        res.status(200).json({frais : items})
    })
})

app.listen(80,()=>{console.log("Serveur prêt !")})
app.use(express.json())


client.connect().then(client =>{
    db = client.db("frais_voyage")
    voyage = db.collection("voyage")
    frais = db.collection('frais')
    console.log('Connected successfully to server');
})
