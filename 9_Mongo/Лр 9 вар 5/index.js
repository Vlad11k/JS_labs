const express = require('express')
const path = require('path')

const timetableDao = require('./modules/timetableDao')

const app = express()
app.set('view engine', 'hbs')

const urlencodedParser = express.urlencoded({extended: false})

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get("/timetable", function (request, response) {
    timetableDao.findAllClasses().then(res => {
        response.render('classes.hbs', {
            classes: res
        })
    })
})

app.get("/class/:classId", function (request, response) {
    const id = request.params['classId']
    timetableDao.findClassById(id).then(res => {
        response.render('class.hbs', {
            class: res
        })
    })

})

app.post("/update", urlencodedParser, function (request, response) {
    const clazz = new timetableDao.Timetable(
        request.body.id, request.body.name, request.body.time, request.body.tutor, request.body.room
    )
    timetableDao.updateClass(clazz).then(() => {
        response.redirect('/timetable')
    })
})

app.post("/remove", urlencodedParser, function (request, response) {
    const id = request.body._id
    timetableDao.removeClass(id).then(() => {
        response.redirect('/timetable')
    })
})

app.post("/addNew", urlencodedParser, function (request, response) {
    const clazz = {
        name: request.body.name,
        time: request.body.time,
        tutor: request.body.tutor,
        room: request.body.room
    }
    timetableDao.addClass(clazz).then(() => {
        response.redirect('/timetable')
    })
})

app.listen(3000, function () {
    console.log('Server started...')
})