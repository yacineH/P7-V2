//import module :bcrypt et jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import du modele de donnée user
const Employee = require('../models/employee');


/**
 * Permet d'enregistrer un nouveau user dans l'application
 * password sera hacher avec bcrypt avant son stockage en base
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password,10)
   .then( hash => {
       const employee= new Employee({
           email : req.body.email,
           name : req.body.name,
           password : hash
       });
       employee.save()
        .then(()=> res.status(201).json({message : 'Utilisateur crée !'}))
        .catch(error => res.status(400).json(error));
   })
   .catch( error => res.status(500).json({ error }))
};

/**
 * Permet de s'authentifier ici avec bcrypt on mail avec le hach stockés en base
 * si bycrypt return un true donc on genere un token qui sera envoyé dans la response   
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.login = (req, res, next) => {
    Employee.findOne({email :req.body.email})
      .then(employee=>{
          if(!employee){
            return res.status(401).json( {error : 'Utilisateur non trouvé'});
          }
          
          bcrypt.compare(req.body.password,employee.password)
           .then(valid => {
               if(!valid){
                   return res.status(401).json({error : 'Mot de passe incorrect !' });
               }
               res.status(200).json({
                   token : jwt.sign(
                       {employee :{id:employee._id,admin:employee.admin}},
                        process.env.JWTPASS,
                       {expiresIn : '24h'}
                    )
               });
           })
           .catch(error => res.status(500).json({error}));
      })
      .catch(error=>res.status(500).json({error}));
};