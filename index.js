const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})