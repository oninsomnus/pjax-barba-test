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

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('*', (req, res) => res.render('not-found'));

var listener = app.listen(process.env.PORT || 8080, () => {
    console.log(`Started on port ${listener.address().port}`);
});
