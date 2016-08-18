var express = require('express');
var app = express();
var Sequelize = require('sequelize');

app.set('views','./views');
app.set('view engine', 'pug');

var sequelize = new Sequelize('psycap', 'denys', 'a1920212223', {
  host: 'localhost',
  dialect: 'mysql',
  port: '8889'
});

var User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  estado: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  }
});

User.sync({}).then(function () {
  // Table created
  return User.create({
    name: 'John',
    estado:'goias',
    lastname: 'Hancock'
  });
});

app.get('/users', function(req, res){
	User.findAll()
	.then(function(result){
		res.render('users',{
			message: 'Mensagem usuario',
			data: result
		})
	.catch(function(err){
		console.log('Error');
	});
	})
});

app.get('/users/:id', function(req, res){
	User
	  .findAll({ where: { id: req.params.id } })
	.then(function(result){
		res.render('users',{
			message: 'Usuario',
			data: result
		})
	})
	.catch(function(err){
		console.log('Error');
	});
});

app.get('/', function(req, res){
	res.render('index', {
		message: 'Hello there!',
		count: 9
	});
	//res.end('Hello');
});

app.listen(3000, '127.0.0.1', function(){
	console.log('Server Started');
})