const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
var Student=require('./models/Student');
var Secrets=require('./models/Secrets');


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

// Change the below URL as per your database end point. In this case, it is mongo db deployed on AWS EC2 instance.
mongoose.connect('mongodb://ec2-user@<ip-address-of-ec2>:27017/students');
const connection = mongoose.connection;

connection.once('open',() => {
	console.log("new code updated");
	console.log('>> success : MongoDB database connection establised successfully');
});

//login credentials
router.route('/secrets').post((req,res) =>{
	let secrets = new Secrets(req.body);
	Secrets.findOne({username:secrets.username},(err,secret) =>{
		if(secret===null){
			res.json(false);
		}
		else if(secret!==null)
		{
			if(secrets.password == secret.password){
			res.json(true);	
		}//if
		else{
		console.log(err);
		res.json(false);
			}//else
	}//ifelse
	});
});


//add credentials
router.route('/secrets/add').post((req,res) => {
	let secrets = new Secrets(req.body);
 secrets.save()
		.then(secrets =>{
			res.status(200).json({'User':'created successfully'});
		})
		.catch(err => {
			res.status(400).send('Failed to create a new user');
		});
});




//list the students
router.route('/students').get((req,res) =>{
	Student.find((err,students) =>{
		if(err)
			console.log(err);
		else
			res.json(students);
	});
});



//add student record to database
router.route('/students/add').post((req,res) => {
	console.log(req.body);
	let student = new Student(req.body);
 student.save()
		.then(student =>{
			res.status(200).json({'student':'Added successfully'});
		})
		.catch(err => {
			res.status(400).send('Failed to create a new record');
		});
});

//delete All the records of students
router.route('/students/deleteAll').post((req,res) => {
 console.log(">> deleteAll called");
 Student.remove({name:"sagar"},(err,student) =>{
 	if(!student)
		res.json(false);
	else
		res.json(true);
 });
});

//update specific record of student in database
router.route('/students/update/:id').post((req,res) => {
	Student.findById(req.params.id,(err,student) =>{
		if(!student)
			return next(new Error('Could not load document'));
		else
			student.name = req.body.name;
			student.studentID = req.body.studentID;
			student.favMovie = req.body.favMovie;
			student.degree = req.body.degree;

			student.save().then(student =>{
				res.json('Update done');
			}).catch(err => {
				res.status(400).send('Update failed');
			});
		
	});
});

// delete specific record of student in database
router.route('/students/delete/:id').get((req,res) =>{
	Student.findByIdAndRemove({_id:req.params.id},(err,student) =>{
		if(err)
			res.json(err);
		else
			res.json('Remove successfully');
	});
});

app.use('/',router);


//app.listen(4000,() => console.log('Express server running on port 4000'));
var port = process.env.PORT || 8081;
app.listen(port,() => console.log('Express server running on port'));
