import express from 'express';
import hbs from 'express-handlebars';

const app = express();

app.engine('html', hbs.create({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    extname: '.html'
}).engine);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/../dist'));

app.get('/', (req, res) => res.render('home', {
    title: 'Home',
    description: 'This is home'
}));
app.get('/about', (req, res) => res.render('about', {
    title: 'About',
    description: 'This is about'
}));
app.get('/contact', (req, res) => res.render('contact', {
    title: 'Kontakt',
    description: 'This is contact'
}));
app.get('*', (req, res) => res.render('not-found', {
    title: '404',
    description: 'This page does not exist'
}));

var listener = app.listen(process.env.PORT || 8080, () => {
    console.log(`Started on port ${listener.address().port}`);
});
