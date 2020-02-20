require('dotenv').config()
const index = require('./.build/src/handlers/facebook-api/handler');
const events =  require('./events/test_data.json');

(async _ => {
    console.log(await index.handleFacebookAPI(events));
})();