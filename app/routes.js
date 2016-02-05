module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	var Poll = require('./models/Poll');
	app.get('/api/polls', function(req, res) {
		Poll.find(function(err, polls) {
			if (err) res.send(err);
			res.json(polls);
		});
	});

	app.post('/api/polls', function(req, res) {
		Poll.create({
			title : req.body.title,
			enabled : true,
			choices : req.body.choices
		}, function(err, poll) {
			if (err) res.send(err);
			// get and return all the polls after you create another
			Poll.find(function(err, polls) {
				if (err) res.send(err);
				res.json(polls);
			});
		});
	});

	app.delete('/api/polls/:poll_id', function(req, res) {
		Poll.remove({
			_id : req.params.poll_id
		}, function(err, poll) {
			if (err) res.send(err);

			// get and return all the polls after you create another
			Poll.find(function(err, polls) {
				if (err) res.send(err);
				res.json(polls);
			});
		});
	});
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('', function(req, res) {
		res.sendfile('./public/index.html');
	});

};