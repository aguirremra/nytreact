const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	date: {
		type: Date,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	comments: {
		type: Array
	}
});

module.exports = mongoose.model('Article', ArticleSchema);