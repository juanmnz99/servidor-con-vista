
const { createLogger, format, transports } = require('winston');

const loggerDevelopment = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});

const loggerProduction = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.File({ filename: 'errors.log', level: 'error' })],
});

module.exports = process.env.NODE_ENV === 'production' ? loggerProduction : loggerDevelopment;
