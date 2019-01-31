const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //see details.
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));//sort of middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `Time: ${now} ${req.method} ${req.url}`;
  console.log(log);
  //req.url -> getting the path of the pages
  fs.appendFile('server.log', log + '\n');
  next(); //fx that tells server to proceed, until it stays there.(page keeps loading)
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('UpperCase', (text) => {
  return text.toUpperCase();
});

// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express</h1>'); html content
//   res.send({ //browser sets it automatically to json type
//     name: 'sahil',
//     hobbies: [
//       'reading',
//       'travelling'
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Website',
    welcomeMessage: 'Welcome to my site'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    Error: 'Unable to connect to the server.'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',//define here an object, to use it in the about.hbs file
    //currentYear: new Date().getFullYear()//to get the current year.
  });
});

app.listen(8080, () => {
  console.log(`Server up on port ${port}`);
});
