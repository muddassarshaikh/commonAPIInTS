const config = {
  portNumber: 6786,
  databaseHost: 'localhost',
  databaseUser: 'root',
  databasePassword: '',
  databaseDatabaseName: 'commondb',
  databasePort: 3306,
  mongoDBConnectionString: 'mongodb://localhost:27017/commonDB',
  emailVerifiedLink: 'http://localhost:4200/confirmEmail?token=',
  resetPasswordLink: 'http://localhost:4200/resetPassword?token=',
  tokenkey: '37LvPsm4vaBcd4CY',
  env: 'development',
  supportEmail: 'info@commonAPI.com',
  SMTPemailAddress: 'developers.winjit@gmail.com',
  SMTPPassword: 'Winjit@321',
  database_initial: 'common',
  database: 'mysql',
  cryptokey: '7476021436',
};

export default config;
