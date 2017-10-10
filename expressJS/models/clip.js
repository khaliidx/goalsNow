let mongoose = require("mongoose")
let moment = require('moment')

let clipSchema = mongoose.Schema({

	title: { type: String, unique:true },
	url: { type: String },
	score: { type: Number },
	nbrComments: { type: Number },
	createdAt: { type: String , default: moment(Date.now()).format("DD-MM-YYYY hh:mm:ss") }
});

//exporting model
module.exports = mongoose.model("Clip", clipSchema);