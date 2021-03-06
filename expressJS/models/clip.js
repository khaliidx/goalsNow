let mongoose = require("mongoose")
let moment = require('moment')

let clipSchema = mongoose.Schema({

	title: { type: String, unique:true },
	url: { type: String },
	score: { type: Number },
	commentLink: { type: String },
	nbrComments: { type: Number },
	createdAt: { type: String },
});

//exporting model
module.exports = mongoose.model("Clip", clipSchema);