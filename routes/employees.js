const router = require('express').Router();
const db = require('../db/Employee');
const { models } = db;
const { Employee } = models
module.exports = router;


router.get('/', (req,res,next)=>{
  Employee.findAll()
  .then(employee => res.render('employees', {title: 'Employees', employee}))
  .catch((err)=> res.render('employees', {err}))
})

router.get('/:id', (req,res,next)=>{
  Employee.findById(req.params.id)
  .then(employee => res.render('employee', {title: employee.fullName, employee}))
  .catch((err)=> res.render('employees', {err}))
})

router.put('/:id', (req,res,next)=>{
  Employee.findById(req.params.id)
  .then((employee)=>{
    Object.assign(employee, req.body)
    return employee.save()
  })
  .then(()=> res.redirect('/employees'))
  .catch((err)=> res.render('employees', {err}))
})

router.delete('/:id', (req,res,next)=>{
  Employee.findById(req.params.id)
  .then((employee)=>{
    employee.destroy();
  })
  .then(()=>{
    res.redirect('/employees')
  })
  .catch((err)=> res.render('employees', {err}))
})

router.post('/', (req,res,next)=>{
  Employee.create(req.body)
  .then( ()=> res.redirect('/employees'))
  .catch((err)=> res.render('employees', {err}))
})