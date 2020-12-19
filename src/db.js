const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const dbUrl = process.env.DB_URL ?
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_Name}?retryWrites=true&w=majority` :
	`mongodb://localhost/${process.env.DB_NAME}`;

mongoose.connect(dbUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
	username: String,
	password: String
});


UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

module.exports = UserDetails;