const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const router = express.Router()

const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatSurnames(array) {
    const newA = []
    array.forEach(element => newA.push(capitalize(element)))
    return newA
}

app.use(express.static('app'))
app.use("/", router)

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/html/index.html')
})

app.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    const arrayCites = req.body.text.split(' ')
    const formatArray = formatSurnames(arrayCites)

    console.log(req)

    fs.writeFile('default.json', JSON.stringify(arrayCites), function (error) {
        if (error) throw error
    })
    fs.writeFile('format.json', JSON.stringify(formatArray.sort()), function (error) {
        if (error) throw error
    })
    res.end()
})

app.post("/default", urlencodedParser, (req, res) => {
    fs.readFile("default.json", 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});

app.post("/format", urlencodedParser, (req, res) => {
    fs.readFile("format.json", 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => console.info(`Порт ${port} открыт`))
