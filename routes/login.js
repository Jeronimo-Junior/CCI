var express = require('express')
var router = express.Router()
var passport = require('passport')
var dao = require("../database/dao")


router.get('/', function (req, res) {
    res.render('login', { message: null })
})

// router.post('/', function (req, res, next) {
//     passport.authenticate('local', {
//         successRedirect: '/perfil',
//         failureRedirect: '/login'
//     });
// })

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err) {
        if (err) {
            res.redirect('/login');
        } else {
            req.login(req.body, (err) => {
                if (!err) {
                    let targetRoute = req.body.userType === 'user' ? '/perfil' : '/users';
                    if (req.body.userType === 'user') {
                        dao.findStudentByEmail(req.body.email).then(([rows]) => {
                            targetRoute += `?id=${rows[0].id_aluno}`
                            res.redirect(targetRoute)
                        }).catch(err => {
                            res.redirect('/login')
                        })
                    } else {
                        res.redirect(targetRoute)
                    }
                } else {
                    console.log(err);
                }
            })

        }
    })(req, res, next);
});




module.exports = router