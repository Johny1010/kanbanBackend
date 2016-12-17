// Load required packages
var mongoose = require('mongoose');

//Define our project schema
var ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 100,
		required: true
	},
	description: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	columns: [{
		column: String
	}],
	cards: [{
		text: String,
		stage: String
	}]
});

//Export the Mongoose model
module.exports = mongoose.model('ProjectSchema', ProjectSchema);