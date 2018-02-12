const employee = require('./Employee')
const _conn = require('./conn')
const { models } = employee;
const { Employee } = models;


const seed = ()=>{
  return Promise.all[
    Employee.create({
      firstName: "Jacob",
      lastName: "Rico",
      nicknames: "jake the snake" 
    }),
    Employee.create({
      firstName: "Travis",
      lastName: "Rico",
      nicknames: "TJ" 
    }),
    Employee.create({
      firstName: "Timothy",
      lastName: "Rico",
      nicknames: "Timmy" 
    })
  ]
}

const sync = ()=>{
  return _conn.sync({force:true})
}

module.exports = {
  seed,
  sync
}