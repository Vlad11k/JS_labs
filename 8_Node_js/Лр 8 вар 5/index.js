const fs = require('fs')
const path = require('path')

const express = require('express')

const app = express()

const urlencodedParser = express.urlencoded({extended: false})


app.use(express.static('app'));

app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'app/html/index.html'))
})

app.get('/doc', (req, resp) => {
    let text = fs.readFileSync(path.join(__dirname, 'file.txt'))
    let json = fs.readFileSync(path.join(__dirname, 'file.json'))

    resp.send(text + '\n' + json)
})

app.post('/form', urlencodedParser, (req, resp) => {
    const data = req.body

    writeToTxt(data)
    writeToJSON(data)

    resp.redirect('/')
})

function writeToTxt(data) {
    fs.writeFileSync(path.join(__dirname, 'file.txt'), '')
    appendToFile(data.name)
    appendToFile(data.surname)
    appendToFile(data.address)
    appendToFile(data.date)
    appendToFile(data.email)
    appendToFile(data.country)
    appendToFile(data.sex)
    appendToFile(data.animal)
}

function writeToJSON(data) {
    let obj = {
        'Имя': data.name,
        'Фамилия': data.surname,
        'Адрес': data.address,
        'Дата рождения': data.date,
        'Почта': data.email,

        'Страна': data.country,
        'Пол': data.sex,
        'Животное': data.animal
    }

    fs.writeFileSync(path.join(__dirname, 'file.json'), JSON.stringify(obj, null, ' '))
}

function appendToFile(data) {
    fs.appendFileSync(path.join(__dirname, 'file.txt'), data + '\n')
}

app.listen(3000, function () {
    console.log('server started...')
})