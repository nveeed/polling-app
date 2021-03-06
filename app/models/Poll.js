// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Poll', {
	title : {type : String, default: ''},
	enabled : {type : Boolean, default: true},
	choices : [
		{title : String, default: ''}
	]
});
