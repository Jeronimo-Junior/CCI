module.exports = function(passport){

    const bcrypt = require('bcryptjs')
    


    const LocalStrategy = require('passport-local').Strategy
    let dao = require('../database/dao')


    passport.serializeUser(function(req,user, done){
      done(null, {value: user, userType: req.body.userType})
    })
      
    passport.deserializeUser( function(payload, done){
      console.log(payload)
      const { value, userType } = payload;
      if(userType === "user"){
        dao.findStudentByEmail(value.email)
        .then(([rows]) => {
          console.log(rows[0])
          let user = rows[0]
          return done(null, user)
        }).catch(err => {
          return done (err, null)
        })
      }else{
        dao.findInstructorByEmail(value.email)
        .then(([rows]) => {
          let user = rows[0]
          return done(null, user)
        }).catch(err => {
          return done (err, null)
        })
      }
      
    })
      
    let strategyConfig = {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }

    passport.use(new LocalStrategy(strategyConfig, function(req,email, password, done){
      console.log("EMAIL: ",email)
      if (req.body.userType === "user"){
        dao.findStudentByEmail(email)
        .then(([rows]) => {
          
          if (rows.length == 0 )return done(null, false)
      
          let user = rows[0]
          if (password === user.senha_aluno ) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch(err =>{
          console.log(err)
          return done(err, null)
        })
      }else{
        dao.findInstructorByEmail(email)
        .then(([rows]) => {
          console.log(rows)
          if (rows.length == 0 )return done(null, false)
      
          let user = rows[0]
          if (password === user.senha_instrutor ) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch(err =>{
          console.log(err)
          return done(err, null)
        })
      }
      
    }))
}