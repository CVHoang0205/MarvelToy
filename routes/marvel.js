const express = require('express')
const MarvelModel = require('../models/MarvelModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    MarvelModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/marvel')
    })
})




router.get('/', (req, res) => {
    MarvelModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('marvel/index', { marvel: data })
        }
    })
})

router.get('/list', (req, res) => {
    MarvelModel.find((err, data) => {
        if (!err) {
            res.render('marvel/list', { marvel: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    MarvelModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/marvel");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("marvel/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    
    MarvelModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/marvel")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    MarvelModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("marvel/update", { marvel: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var marvel = req.body;
    MarvelModel.findByIdAndUpdate(id, marvel, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/marvel")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    MarvelModel.findById(req.params.id, (err, marvel) => {
        if (!err) {
            res.render('marvel/info', { marvel: marvel })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    MarvelModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('marvel/index', { marvel: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    MarvelModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('marvel/index', { marvel: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    MarvelModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('marvel/index', { marvel: data })
            }
        })
})
module.exports = router