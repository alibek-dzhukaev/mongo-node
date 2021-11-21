const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 5001

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todos')

  app.set('view engine', 'ejs')
  app.use(express.urlencoded({extended: false}))
  app.use(methodOverride('_method'))

  app.use('/articles', articleRouter)

  app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {
      text: "Hello",
      articles
    })
  })

  app.listen(PORT, 'localhost', () => {
    console.log('Server is running on port ' + PORT)
  })
}


start()
