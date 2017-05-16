const path = require('path');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const next = require('next')

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const middleware = require('./api/middleware');
const services = require('./api/services');
const appHooks = require('./api/app.hooks');

const authentication = require('./api/authentication');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = feathers();
    // Load app configuration
    server.configure(configuration(__dirname));
    // Enable CORS, security, compression, favicon and body parsing
    server.use(cors());
    server.use(helmet());
    server.use(compress());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // Set up Plugins and providers
    server.configure(hooks());
    server.configure(rest());

    server.configure(socketio());
    server.configure(authentication);

    // Set up our services (see `services/index.js`)
    server.configure(services);

    server.get('*', (req, res) => {
        return handle(req, res);
    })
    // Configure middleware (see `middleware/index.js`) - always has to be last
    server.configure(middleware);
    server.hooks(appHooks);

    const port = server.get('port');
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on ${server.get('host')}:${port}`);
    })
})

