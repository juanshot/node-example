const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
// using handlebars como template engine
// registering partials folder
hbs.registerPartials('./views/partials');
// registering helpers fot hb
hbs.registerHelper('getCurrentYear', () => {
    return (new Date).getFullYear();
});
app.set('view engine', 'handlebars');
//express middlewares
app.use((req, res, next) => {
    let now = (new Date()).toString();
    let log =`${now}-${req.method}-${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
});
// maintenence middleware
app.use((req, res, next) => {
    if (req.url === '/about') {
        res.render('maintenence.hbs');
    } else {
        next();
    }
});
// this is to serve static files... that is awesome!!
app.use(express.static('public'));
// middlewares are excecuted in the order they have been declared
// routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        welcomeMessage: 'you are welcome'
    })
});
app.get('/users', (req, res) => {
    res.send({
        response: [
            {
                name: 'Juan'
            },
            {
                name: 'Pepe'
            },
        ]
    });
});
app.get('/about', (req, res) => {
    // it makes render when you are using a template engine
    res.render('about.hbs', {
        title: 'About Page',
        welcomeMessage: 'This is an about page'
    })
});

app.listen(3000, () => {
    console.log('server is log on the port 300');
});