const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));


app.get('/', (req, res) => {
	res.render('index', {title: 'Index'});
})

app.listen(PORT, () => debug(`Listerning on port ${chalk.green(PORT)}`));