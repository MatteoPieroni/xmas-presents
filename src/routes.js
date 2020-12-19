const connectEnsureLogin = require('connect-ensure-login');

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

	app.get('/private',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.sendFile('views/private.html', {root: __dirname})
	);

	app.get('/user',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.send({user: req.user})
	);
};

module.exports = setUpRoutes;