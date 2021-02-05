// const Mysqli = require('mysql2');
const jwt = require('jsonwebtoken');
const log4js=require('log4js')

const today = new Date();
// console.log(today)
const day = today.getDate();        // 24
const month = today.getMonth();     // 10 (Month is 0-based, so 10 means 11th Month)
const year = today.getFullYear();   // 2020

const secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";
// log4js.configure({
//     appenders:{fileAppender:{type:'file',  filename: 'application.log',pattern: '.yyyy-MM-dd-hh', compress: true
//     // filename:`log/+${day}'+'${month}'+'${year}'+'currentdate.log`
// }},
//     categories:{default:{appenders:['fileAppender'],level:'info'}}
// })
log4js.configure({
    appenders: {
      everything: { type: 'dateFile', filename: 'log/all-the-logs.log', pattern: '.yyyy-MM-dd-hh', compress: true }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'debug'}
    }
  });
  
const logger=log4js.getLogger();


module.exports = {
    secret: secret,
    logger:logger,
    validJWTNeeded: (req, res, next) => {
        if (req.headers['authorization']) {            
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).json({
                        message:"Unauthorized"
                    });;
                } else {
                    req.jwt = jwt.verify(authorization[1], secret);
                    return next();
                }
            } catch (err) {
                return res.status(403).json({
                    message:"Authentication faileds"
                });
            }
        } else {
            return res.status(401).json({
                message:"No authorization header found."
            });
        }
    },    
    hasAuthFields: (req, res, next) => {
        let errors = [];

        if (req.body) {
            if (!req.body.email) {
                errors.push('Missing email field');
            }
            if (!req.body.password) {
                errors.push('Missing password field');
            }

            if (errors.length) {
                return res.status(400).send({errors: errors.join(',')});
            } else {
                return next();
            }
        } else {
            return res.status(400).send({errors: 'Missing email and password fields'});
        }
    }    
};
