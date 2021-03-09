const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://Test:test123@cluster0.xvqtg.mongodb.net/comments-database?retryWrites=true&w=majority',{ useUnifiedTopology: true })
.then(client => {
  console.log("Database connected")
  const db = client.db('comments-database')
  const commentsCollection = db.collection('comments')
  
  app.listen(3000, function() {
    console.log('listening on 3000')
  })

  // This enables our app to use body bodyParser, so we can get our information from our HTML form
  app.use(bodyParser.urlencoded({ extended: true }))

  // example of a get function
  // app.get('/', (req, res) => {
  //   res.sendFile(__dirname + '/index.html')
  //   // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // })

  app.post('/comments', (req, res) => {
    commentsCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
      // console.log(result.ops)
    })
    .catch(error => console.error(error))
  })

    app.get('/', (req, res) => { 
    db.collection('comments').find().toArray()
      .then(results => {
        res.render('index.ejs', { comments: results })
      })
      .catch(error => console.error(error))
  })
})






//   app.get('/', (req, res) => {
//     db.collection('comments').find().toArray()
//     .then(results => {
//       res.render('index.ejs' , { comments: results })
//     })
//     .catch(error => console.error(error))
//   })
//   comments-collection.insertOne(req.body)
// })