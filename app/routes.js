var Project = require('./ProjectModel');

module.exports = function(app) {
	//-------------------PROJECTS-----------------

	//GET all projects
	app.get('/api/kanban/projects', function (req, res) {
		Project.find(function(err, projects) {
			if (err) {
				res.send(err);
			}
			var allProjects = [];
			projects.forEach(function(proj) {
				allProjects.push({
					name: proj.name,
					description: proj.description,
					created_at: proj.created_at,
					columns: proj.columns
				})
			});
			res.json(allProjects);
		});
	});

	//-------------------ONE PROJECT-----------------

	//POST new project
	app.post('/api/kanban/projects', function (req, res) {
		// Create a new instance of the Project model
		var proj = new Project();

		// Set the project properties that came from the POST data
		proj.name = req.body.name;
		proj.description = req.body.description;
		proj.createdAt = req.body.createdAt;
		proj.columns = req.body.columns;
		proj.cards = req.body.cards;

		// Save the project and check for errors
		proj.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Project added to the database!', data: proj });
		});
	});

	//GET one project
	app.get('/api/kanban/projects/:id', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}
			res.json(project);
		});
	});

	//DELETE project
	app.delete('/api/kanban/projects/:id', function(req, res) {
		Project.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Project removed from the database!' });
		});
	});

	//-------------------COLUMNS-----------------

	//POST new column in kanban
	app.post('/api/kanban/projects/:id/column', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}

			if (req.body.name) {
				project.columns.push({
					column: req.body.column
				})
			}

			project.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(project);
			});
		});
	});

	//DELETE column in kanban
	app.delete('/api/kanban/projects/:id/column/:column_id', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}
			var columnPlace = -1;

			project.columns.forEach(function(column, i){
				if(column._id == req.params.column_id){
					columnPlace = i;
				}
			});

			if(columnPlace > -1) {
				project.columns.splice(columnPlace, 1);
				project.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json(project);
				});
			} else {
				res.send("No column with this id");
			}
		});
	});

	//PUT changes in column
	app.put('/app/kanban/projects/:id/column/:column_id', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}
			var columnPlace = 0;
			project.columns.forEach(function(column, i){
				if(column._id == req.params.column_id){
					columnPlace = i;
				}
			});
			project.columns[columnPlace] = { column: req.body.column };

			project.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(project);
			});
		});
	});
	//-------------------CARDS-----------------

	//POST new card in kanban
	app.post('/api/kanban/projects/:id/card', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}

			if (req.body.text) {
				project.cards.push({
					text: req.body.text,
					stage: project.columns[0]
				})
			}

			project.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(project);
			});
		});
	});

	//PUT changes in card
	app.put('/app/kanban/projects/:id/card/:card_id', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}
			var cardPlace = 0;
			project.cards.forEach(function(card, i){
				if(card._id == req.params.card_id){
					cardPlace = i;
				}
			});
			if (req.body.text) {
				project.cards[cardPlace].text = req.body.text;
			}
			if (req.body.stage) {
				project.cards[cardPlace].stage = req.body.stage;
			}

			project.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(project);
			});
		});
	});

	//DELETE card from column
	app.delete('/api/kanban/projects/:id/card/:card_id', function(req, res) {
		Project.findById(req.params.id, function(err, project) {
			if (err) {
				res.send(err);
			}
			var cardPlace = -1;

			project.cards.forEach(function(card, i){
				if(card._id == req.params.card_id){
					cardPlace = i;
				}
			});

			if(cardPlace > -1) {
				project.cards.splice(cardPlace, 1);
				project.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json(project);
				});
			} else {
				res.send("No card with this id");
			}
		});
	});

};