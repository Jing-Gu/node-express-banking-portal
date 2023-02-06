const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const {accounts, users, writeJSON} = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 3000;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);


app.get('/', (req, res) => {
	res.render('index', {
		title: 'Account Summary',
		accounts,
	});
})

app.get('/profile', (req, res) => {
	res.render('profile', {user: users[0]});
})


app.listen(PORT, () => debug(`Listerning on port ${chalk.green(PORT)}`));