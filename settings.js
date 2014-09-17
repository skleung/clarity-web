var utils = require('./lib/utils.js');

module.exports = function(app, express) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());

  // By default: session middleware uses the memory store bundled with Connect
  app.use(express.session({
    secret: 'SECRET HERE',
    resave: true,
    saveUninitialized: true
  }));

  app.use(express.static(__dirname + '/public'));

  app.use(app.router);

  // last handler, assume 404 at this point
  app.use(utils.render404);
}
