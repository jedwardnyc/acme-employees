const express = require('express');
const nunjucks = require('nunjucks');
const db = require('./db/Employee');
const { models } = db;
const { Employee } = models
const app = express();

nunjucks.configure({noCache: true})

app.use(require('body-parser').urlencoded())
app.use(require('method-override')('_method'))

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use((req, res, next) => {
  res.locals.path = req.url;
  Employee.findAll()
  .then((employees)=>{
    res.locals.employeeCount = employees.length
    let result = employees.reduce(function(sum,employee){
      return sum + employee.nicknames.length
    },0)
    res.locals.nicknameCount = result
    next();
  })
});

app.get('/', (req,res,next)=>{
  res.render('index', {title: "Home"})
  .catch(err=> res.render('employees', {err}))
})

app.use('/employees', require('./routes/employees'))
app.use('/vendor', express.static('node_modules'))
app.use('/vendor', express.static('styles'))

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`))


const conn = require('./db/index')

conn.sync()
  .then(()=> conn.seed())
