const _conn = require('./conn')
const Sequelize = require('sequelize')

const Employee = _conn.define('employee',{
  firstName:{
    type: Sequelize.STRING,
    validate: {notEmpty: true}
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {notEmpty:true}
  },
  nicknames: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(val){
      const names = val.split(",");
      let nicks = []
      names.forEach(function(nick){
        if (nick.length) nicks.push(nick)
      })
      this.setDataValue('nicknames', nicks)
    }
  }
},
{
  getterMethods: {
    fullName(){
      return `${this.firstName} ${this.lastName}`;
    },
  }
}
);

module.exports = {
  models:{
    Employee
  }
}
