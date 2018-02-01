module.exports = function(app){

	var usuario = app.controllers.usuarios;

	app.route('/usuarios')
		.get(usuario.index);
	
	app.route('/usuarios/create')
		.get(usuario.create)
		.post(usuario.post);

	app.route('/usuarios/update/:id')
		.get(usuario.update)
		.post(usuario.salveUpd);
	
	app.route('/usuarios/show/:id')
		.get(usuario.show);

	app.route('/usuarios/delete/:id')
		.post(usuario.delete);

}