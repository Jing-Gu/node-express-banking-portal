const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf-8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf-8');
const users = JSON.parse(userData);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));


app.get('/', (req, res) => {
	res.render('index', {
		title: 'Account Summary',
		accounts,
	});
})
app.get('/savings', (req, res) => {
	res.render('account', {account: accounts.savings});
})
app.get('/checking', (req, res) => {
	res.render('account', {account: accounts.checking});
})
app.get('/credit', (req, res) => {
	res.render('account', {account: accounts.credit});
})
app.get('/profile', (req, res) => {
	res.render('profile', {user: users[0]});
})

app.listen(PORT, () => debug(`Listerning on port ${chalk.green(PORT)}`));