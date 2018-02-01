var express      		= require('express'),
	path         		= require('path'),
	favicon      		= require('static-favicon'),
	logger       		= require('morgan'),
	cookieParser 		= require('cookie-parser'),
	bodyParser   		= require('body-parser'),
	session      		= require('express-session'),
	load         		= require('express-load'),
	mongoose     		= require('mongoose'),
	flash 		 		= require('express-flash'),
	expressValidator	= require('express-validator'),
	app 		 		= express();

//conectar ao banco mongodb
//mongoose.connect('mongodb://localhost/acadtec', function(err){
mongoose.connect('mongodb://marllon.mfb@gmail.com:vulcano2210@ds121898.mlab.com:21898/bigbig', function(err){
	if (err){
    	console.log('Erro ao conectar no mongodb: '+err);
  	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'sua-chave-secreta' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

load('models').then('controllers').then('routes').into(app);

var port = process.env.PORT || 5000;

//middleware
var erros = require('./middleware/erros');
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(port, function() {
    console.log('Express server listening on port: ' + port);
});
