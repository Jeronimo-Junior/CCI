var express = require('express');
const { route } = require('.');
var router = express.Router();
var dao = require('../database/dao')

router.get('/', function(request, response){
    dao.list().then( ([rows]) => {
        response.render('alunos/list', {alunos:rows})
    }).catch( err => {
        console.log(err)
        response.render('alunos/list', {alunos: []})
    })  
});

router.delete('/delete', function(request, response){
    dao.remove(request.body.id)
    .then(([ result ]) => {
        console.log(result)
        if(result.affectedRows > 0)
            request.flash('success', 'Aluno excluido com sucesso.')
        else
            request.flash('success', `Não foi encontrado no banco aluno com id = ${request.body.id}`)
        response.redirect('/users')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do aluno.')
        response.redirect('/users')
    })
    

})



router.get('/form', async function(request, response){
    console.log("GET FORM")
    row = {
        nome: '',
        id_curso_fk: '',
        email_aluno: '',
        senha_aluno: '',
        horas_restantes:''
        
    }
    if(request.query.id){
        [result] = await dao.findByID(request.query.id)
        row = result[0]
    }
    response.render('alunos/form', {aluno: row})
});





router.post('/save', function (request, response){
    

    if (request.body.id){
        operacao = dao.update
        console.log("Dados do aluno atualizados com sucesso")
        success = 'Dados do aluno atualizados com sucesso.'
    }else{
        operacao = dao.save
        console.log("Aluno cadastrado com sucesso")
        success = 'Aluno cadastrado com sucesso.'
    }

    operacao(request.body)
    .then( ([ result ]) => {
        request.flash('success', success)
        response.redirect('/users')
    }).catch(err => {
        console.log("Não foi possível cadastrar o aluno",err)
        request.flash('error', 'Não foi possivel cadastrar o aluno.')
        response.redirect('/users')
    })    
})

router.get('/search', function(request, response){
    if(request.query.nome){
        dao.search(request.query.nome)
        .then(( [ rows ] ) => {
            response.render('users', {alunos: rows})
        }).catch(err => {
            console.log("Não foi possível efetuar a busca por nome",err)
            request.flash('error', 'Não foi possível efetuar a busca por nome.')
            response.redirect('/users')
        })

    }else{
        response.redirect('/users')
    }

})

module.exports = router;