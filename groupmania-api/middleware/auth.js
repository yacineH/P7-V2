//import du module jsonwebtoken
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

/**
 * Permet de verfifier pour chaque request envoyer headers authorization 
 * le token avec userId dans la requette si le userId est le meme que celui du token on continue avec
 * le nest middleware sinon throw exception qui sera catche pour envoyer une response 401
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWTPASS);
    const employeeIdToken = decodedToken.employee.id;
    const employeeAdminToken =decodedToken.employee.admin;
    
    Employee.findOne({_id :employeeIdToken})
     .then(employee=>{
      req.employeeId = employeeIdToken;
      req.admin =employeeAdminToken; 
      next();
     })
     .catch(error => res.status(500).json({error}) );
    }
    catch {
       res.status(401).json({message : "Problèmes d'authentification"});
    }
  };
