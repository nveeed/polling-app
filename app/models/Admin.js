// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Admin', {
	name : {type : String, default: ''},
	email : {type : String, default: ''},
	password : {type : String, default: ''}
});
