/*
Secrets Model
*/
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let Secrets = new Schema({
	username:{
		type:String
	},
	password:{
		type:String
	}
});

module.exports = mongoose.model('Secrets', Secrets);
