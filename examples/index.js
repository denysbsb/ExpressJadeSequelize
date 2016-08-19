var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('views','./views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var db = 'psycap';
var user = 'denys';
var pass = 'a1920212223';

var sequelize = new Sequelize(db, user, pass, {
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

User.sync({force:true}).then(function () {
  // Table created
  return User.create({
    name: 'Denys',
    estado:'goias',
    lastname: 'Fontenele'
  });
});

app.get('/users', function(req, res){
	User.findAll()
	.then(function(result){
		res.render('users',{
			message: 'Mensagem usuario',
			data: result
		});
	})
	.catch(function(err){
		console.log('Error');
	});

});

app.get('/users/:id', function(req, res){
	User
	  .findAll({ where: { id: req.params.id } })
	.then(function(result){
		res.render('users',{
			message: 'Usuario',
			data: result
		});
	})
	.catch(function(err){
		console.log('Error');
	});
});

app.delete('/users/:id', function(req, res){
	User
	  .destroy({ where: { id: req.params.id } })
	.then(function(result){
		res.render('users',{
			message: 'Usuario',
			data: result
		});
	})
	.catch(function(err){
		console.log('Error');
	});
});

app.get('/user/create', function(req, res){
	res.render('new_users', {
		message: 'Hello there!',
		count: 9
	});
});

app.post('/user/create',function(req, res){
	User.create({
	    name: req.body.name,
	    estado:'goias',
	    lastname: req.body.lastname
  	}).then(function(result){
  		User.findAll().then(function(result){
  			res.render('users',{
				message: 'Lista Usuarios',
				data: result
			});
  		})
  	}).catch(function(err){

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