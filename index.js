const express = require('express')

const fs = require('fs')

const hbs = require('hbs')

app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getYear', ()=> {
    return new Date().getFullYear()
})
let myLog = (req, res, next) => {
    let now = new Date().toDateString()
    let log = `${now} ${req.method}`
    fs.appendFileSync('server.log', log)
    console.log(log)
    next()
}
app.use(myLog)

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set(
    'view engine', 'hbs'
)


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=> {
    res.render('home.hbs', {
        title: `Welcome To the App`
    })
})
app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'This is the about Page'
    })
})

app.listen(3000)