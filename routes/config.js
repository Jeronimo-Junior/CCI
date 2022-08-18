module.exports = function(app){
    var indexRouter = require('./index');
    var usersRouter = require('./users');
    var alunosRouter = require('./alunos');
    var loginRouter = require('./login');
    var perfilRouter = require('./perfil');
  

    let middlewareAutorization = function( req, resp, next){
      console.log(req.session.passport)
        if (req.isAuthenticated()) {
          return next()
        }else {
          console.log('aaaaa')
          resp.redirect('/login')
        }
      }

    app.use('/', indexRouter);
    app.use('/users',middlewareAutorization, usersRouter);
    app.use('/alunos', middlewareAutorization, alunosRouter);
    app.use('/login', loginRouter);
    app.use('/perfil',middlewareAutorization, perfilRouter);
    // app.use('/cronometro',cronometroRouter);
    
}