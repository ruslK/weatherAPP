const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials('./views/partials');

app.set('view engine', 'hbs');

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err) {
            console.log(`Unable to append to server.log`);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintence.hbs');
// });

// app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: 'Wellcome to the Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/maintence', (req, res) => {
    res.render('maintence.hbs', {
        pageTitle: 'MainTense Page',
        wellcomeMessage: 'Wellcome to the Maintage Page'
    })
})

