const companyRoutes=require('./companies.route');
const rolesRoutes=require('./roles.route');
const usersRoutes=require('./users.route');
const countryRoutes=require('./countries.route');
const sectorRoutes=require('./sectors.route');
const employeeRoute=require('./employee_strength.route');
const avrageempRoute=require('./average_employee.route');
const feedbackfreqRoute=require('./feedback_frequencies.route')
module.exports =(router) =>{    
    companyRoutes(router);
    rolesRoutes(router);
    usersRoutes(router);
    countryRoutes(router);
    sectorRoutes(router);
    employeeRoute(router);
    avrageempRoute(router);
    feedbackfreqRoute(router);
    return router;
};
