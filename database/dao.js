const { query } = require('./config')
const pool = require('./config')

let operations = {
    list: function() {
       return pool.promise().query('select * from aluno')

    },
    findInstructorById(id) {
        return pool.promise().query('select * from instrutor where id_instrutor =?', [id])
    },
    save: function(aluno){
        console.log("ALUNO",aluno)
        return pool.promise().execute('INSERT INTO aluno (nome ,id_curso_fk,nome_curso_fk, email_aluno,senha_aluno,horas_restantes) VALUES (?, ?, ?, ? ,?,?)', [ aluno.nome, aluno.id_curso_fk,aluno.nome_curso_fk, aluno.email_aluno, aluno.senha_aluno, aluno.horas_restantes])
    },
    // faltando virgula depois de horas_restantes(?)
    update: function(aluno){
        return pool.promise().execute('UPDATE aluno set nome=?, id_curso_fk=?,nome_curso_fk=? ,email_aluno=?, horas_restantes=? where id_aluno=?', [aluno.nome,aluno.id_curso_fk,aluno.nome_curso_fk ,aluno.email_aluno, aluno.horas_restantes, aluno.id_aluno])

    },
    remove: function(id){
        return pool.promise().execute('delete from aluno where id_aluno= ?', [id])
    },

    search: function(nome){
        return pool.promise().query('select * from aluno where nome like ?', ['%'+nome+'%']  )
    },
    findByID: function(id){
        return pool.promise().query('select * from aluno where id_aluno=?', [id])
    },

    findByUsername: function(username){
        console.log(username)
        return pool.promise().query('select * from aluno where nome=?', [username])
    },
    findInstructorByEmail:function(instructor_email){
        return pool.promise().query('select * from instrutor where email_instrutor=?', [instructor_email])
    },
    findCourseIDByName: function(name){
        return pool.promise().query('select id_curso from cursos where nome_curso=? ',[name])
    },
    findCourseByName: function(name){
        return pool.promise().query('select * from cursos where nome_curso=? ',[name])
    },
    getTotalStudents: function() {
        return pool.promise().query('select count(*) from aluno')
    },
    findInstructorByName:function(username){
        console.log(username)
        return pool.promise().query('select * from instrutor where nome=?', [username])
    },
    findStudentByEmail:function(aluno_email){
        return pool.promise().query('select * from aluno where email_aluno=?', [aluno_email])
    }

}


module.exports = operations

// pool.promise().query('select * from alunos')
// .then( ( [rows, fields] ) => {
//     console.log(fields)
// }) 