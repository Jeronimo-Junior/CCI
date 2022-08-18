var express = require('express');
const operations = require('../database/dao');
var router = express.Router();
var dao = require('../database/dao')

/* GET users listing. */
router.get('/', function (req, res) {
  dao.getTotalStudents().then(([countResult])=>{
    console.log(countResult)
    dao.list()
      .then(([rows]) => {
        res.render('users', { alunos: rows, qtdAlunos: countResult[0]['count(*)'] });
      })
      .catch(err => {
        console.log(err)
        res.render('users', { alunos: [], qtdAlunos: 0  });
      })
  })
});

router.post('/delete', function (request, response) {
  dao.remove(request.body.id)
    .then(([result]) => {
      if (result.affectedRows > 0) {
        console.log("Aluno excluído")
        request.flash('success', 'Aluno excluido com sucesso.')
      }
      else {
        console.log("Aluno não encontrado")
        request.flash('success', `Não foi encontrado no banco aluno com id = ${request.body.id}`)
        response.redirect('/users')
      }
    }).catch(err => {
      console.log("Erro ao excluir", err)
      request.flash('error', 'Ocorreu um erro na exclusão do aluno.')
      response.redirect('/users')
    })



})





router.post('/save', function (req, res) {
  dao.findCourseIDByName(req.body.nome_curso_fk).then(([rows]) => {
    if (rows.length) {
      console.log("CURSO ENCONTRADO", rows)
      req.body.id_curso_fk = rows[0].id_curso
      if (req.body.id_aluno) {
        operacao = dao.update
        success = `Dados do aluno atualizados com sucesso.`
      } else {
        operacao = dao.save
        success = `Aluno cadastrado com sucesso.`
      }

      console.log(req.body)

      operacao(req.body)
        .then(([result]) => {
          req.flash('success', success)
          res.redirect('/users')
        }).catch(err => {
          console.log("Não Foi salvo ", err)
          req.flash('error', `Não foi possível cadastrar o aluno.`)
          res.redirect('/users')
        })
    } else {
      console.log("Curso não encontrado ", err)
      req.flash('error', `Não foi possível encontrar o curso com o nome desejado.`)
      res.redirect('/alunos/form')
    }
  })
  .catch(err => {
    console.log("NÃO FOI POSSÍVEL CRIAR",err)
    res.redirect('/alunos/form');
  })



});

module.exports = router;
