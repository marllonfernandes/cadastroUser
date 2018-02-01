var moment    = require('moment');
var validacao = require('../validators/usuarios');

module.exports = function(app){
	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err,data){
				if(err){
					req.flash('erro', 'Erro ao cadastrar: '+err);
					res.render('usuarios/index',{lista: null});		
				}
				res.render("usuarios/index", {lista: data, moment: moment});
			});			
		},

		create: function(req,res){
			res.render('usuarios/create', {user : new Usuario()});
		},
		
		post: function(req,res){			
			if(validacao(req,res,app)){
				var model      = new Usuario();
				model.nome     = req.body.nome;
				model.blog     = req.body.blog;
				model.email    = req.body.email;
				model.password = model.generateHash(req.body.password);
				Usuario.findOne({'email': model.email}, function(err,data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
  						res.render('usuarios/create', {user: model});
					}else{
						model.save(function(err){				 
							if(err){						
								req.flash('erro', err);
  								res.render('usuarios/create', {user: model});
							}else{
								req.flash('info','Usuário cadastrado com sucesso!');
								res.redirect('/usuarios');
							}				
						});
					}
				});				
			}else{
				res.render('usuarios/create', {user: req.body});
			}						
		},

		salveUpd: function(req,res) {
			Usuario.findById(req.params.id, function(err,data){
				var model = data;
				model.nome     = req.body.nome;
				model.blog     = req.body.blog;
				model.email    = req.body.email;
				if(err){
					req.flash('erro', 'Erro ao carregar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					model.save(function(err){				 
						if(err){						
							req.flash('erro', err);
							  res.render('usuarios/update', {usuario: model});
						}else{
							req.flash('info','Usuário atualizado com sucesso!');
							res.redirect('/usuarios');
						}				
					});
				}
			});
		},

		update: function(req,res) {
			Usuario.findById(req.params.id, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao carregar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/update',{usuario: data, moment: moment});
				}
			});
		},

		delete: function(req,res) {
			Usuario.findById(req.params.id, function(err,data){
				var model = data;
				if(err){
					req.flash('erro', 'Erro ao carregar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					model.remove(function(err){				 
						if(err){
							res.json(400,'Erro ao excluir usuário ' + err);
							// req.flash('erro', err);
							// res.render('usuarios/delete', {usuario: model});
						}else{
							res.json(200,'Usuário excluido com sucesso!');
							// req.flash('info','Usuário excluido com sucesso!');
							// res.redirect('/usuarios');
						}				
					});
				}
			});
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao carregar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/show',{usuario: data, moment: moment});
				}
			});
		}
	}

	return UsuarioController;
}