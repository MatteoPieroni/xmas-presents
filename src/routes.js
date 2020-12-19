const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
const constants = require('./constants');

const setUpRoutes = (app) => {
	app.post('/login', (req, res, next) => {
		passport.authenticate('local',
		(err, user, info) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.redirect('/login?info=' + info);
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}

				return res.redirect('/');
			});

		})(req, res, next);
	});

	app.get('/login',
		(req, res) => res.sendFile('views/log-in.html',
		{ root: __dirname })
	);

	app.get('/',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/index.html', {root: __dirname})
	);

	app.get('/user',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.send({user: req.user})
	);

	app.get('/quiz-question-1',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/quiz-question-1.html', {root: __dirname})
	);

	app.get('/quiz-question-2',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/quiz-question-2.html', {root: __dirname})
	);

	app.get('/quiz-question-3',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/quiz-question-3.html', {root: __dirname})
	);

	app.get('/quiz-question-4',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/quiz-question-4.html', {root: __dirname})
	);

	app.post('/question-1', 
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			const answer = req.body['question-1'];

			console.log({ body: req.body })
			
			if (answer !== constants.answer1) {
				return res.redirect('quiz-question-1?error=true');
			}
			
			req.session['question-1'] = answer;

			res.redirect('quiz-question-2');
		}
	);

	app.post('/question-2', 
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			const answer = req.body['question-2'];
			
			if (answer !== constants.answer2) {
				return res.redirect('quiz-question-2?error=true');
			}
			
			req.session['question-2'] = answer;

			res.redirect('quiz-question-3');
		}
	);

	app.post('/question-3', 
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			const answer = req.body['question-3'];
			
			if (answer !== constants.answer3) {
				return res.redirect('quiz-question-3?error=true');
			}
			
			req.session['question-3'] = answer;

			res.redirect('quiz-question-4');
		}
	);

	app.post('/question-4', 
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			const answer = req.body['question-4'];
			
			if (answer !== constants.answer4) {
				return res.redirect('quiz-question-4?error=true');
			}
			
			req.session['question-4'] = answer;

			res.redirect('success');
			
		}
	);

	app.get('/success',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			const data = req.session;

			if (!data['question-1'] || !data['question-2'] || !data['question-3'] || !data['question-4']) {
				return res.redirect('/');
			}

			res.sendFile(`views/success-${req.user.username}.html`, {root: __dirname});
		},
	);

	app.get('/download',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			res.sendFile(`assets/images/${req.user.username}-tokens.zip`, {root: __dirname})
		},
	);
};

module.exports = setUpRoutes;