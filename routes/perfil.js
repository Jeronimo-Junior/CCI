const express = require('express')
const router = express.Router()
const passport = require('passport')
var dao = require("../database/dao")

router.get('/', function(req, res){
    dao.findByID(req.query.id).then(([studentResult])=>{
        dao.findCourseByName(studentResult[0].nome_curso_fk).then(([courseResult])=>{
            console.log(courseResult[0])
            res.render('perfil', {aluno: studentResult[0], curso:courseResult[0]})
        })
    }).catch(err=>{
        res.redirect('/login')
    })
    
}) 

/* router.post('/', passport.authenticate('local', {
    successRedirect: '/perfil',
    failureRedirect: '/login'
    
})) */


module.exports = router