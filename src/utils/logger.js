const winston = require('winston');

// Define log levels
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green'
    }
};

// Configure logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        })
    ]
});

// Export logger
module.exports = logger;
