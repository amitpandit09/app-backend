/*
 Student Model
*/

const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	semester:{
		type:String
	},
	favMovie:{
		type:String,
		default:'Interstellar'
	},
	courseReason:{
		type:String
	},
	program:{
		type:String
	},
	SImeaning:{
		type:String
	},
	concentration:{
		type:String
	},
	proficiency:{
		type:String
	},
	database:{
		type:String
	},
	cloudservices:{
		type:String
	},
	technologies:{
		type:String
	},
	degree:{
		type:String
	},
	goals:{
		type:String
	}
});

module.exports = mongoose.model('Student', Student);
