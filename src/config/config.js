const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });
// Enforce type on the following properties:
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().description('database server hostname (usually localhost)'),
    DB_USERNAME: Joi.string().description('username to connect to database'),
    DB_PASSWORD: Joi.string().description('password to connect to database'),
    DB_NAME: Joi.string().description('name of database'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
// Define Config
module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    db: {
      host: envVars.DB_HOST,
      username: envVars.DB_USERNAME,
      password: envVars.DB_PASSWORD,
      database: envVars.DB_NAME
    },
    email: {
      smtp: {
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        auth: {
          user: envVars.SMTP_USERNAME,
          pass: envVars.SMTP_PASSWORD,
        },
      },
      from: envVars.EMAIL_FROM,
   }
};