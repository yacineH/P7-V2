const Post = require('../models/post');
const fs= require('fs');
const internal = require('stream');


/**
 * Renvoie un tableau avec tous les messages stockés en base
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.getAllPosts = (req, res, next) => {

    const nbPage =parseInt(req.params.page)
    const postsParPage =parseInt(process.env.POSTS_PAGE)

    Post.find()
      .then(posts =>
             {
                //du plus recent au plus vieux
                posts.sort((param1, param2) => {
                return param2.datePost - param1.datePost
                })
                 
                //debut pagination
                const totalPages = posts.length % postsParPage === 0 
                                        ? posts.length / postsParPage 
                                        : parseInt(posts.length / postsParPage) + 1 


                var debutPage = nbPage === 1 ? 0 : (nbPage - 1) * postsParPage + 1
                var finPage =  ((nbPage * postsParPage) <= posts.length) 
                                   ? (nbPage * postsParPage)
                                   : (posts.length) 
               

                var pagePosts = posts.slice(debutPage,finPage)
                             
                res.status(200).json({posts: pagePosts ,totalPage : totalPages})
            })
      .catch(error => res.status(400).json({ error }));
};


/**
 * Renvoi le post a partir de son params id dans la request
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.getOnePost = (req, res, next) => {
    if(req.params.id){
     Post.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
    }
    else{
      res.status(400).json({message : "Problèmes dans la requette"});
    }
};


/**
 * Enregistre le message en base avec initialisation des proprietes 
 * definition du chemin dans imageUrl
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = new Post({
    ...postObject,
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : [],
    datePost :Date.now(),
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};


/**
 * Met a jour le message,verifie dans la request la presance ou pas d'un fichier
 * sans file donc les infos sont dans le body avec sauce en json
 * avec file req.file.filename
 * verifie si le user qui envoi la request est bien le createur du message 
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.modifyPost = (req, res, next) => {

  Post.findOne({ _id: req.params.id })
  .then(post => {
    if(post.employeeId === req.employeeId){
      var postObject={};
      if(req.file) { 
        const filename = post.imageUrl ? post.imageUrl.split('/images/')[1] : "";

        postObject={
            ...JSON.parse(req.body.post),
            imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          };
        
        filename ?
        fs.unlink(`images/${filename}`, () => {
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post modifié !'}))
            .catch(error => res.status(400).json({ error }));
        })
        :  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
               .then(() => res.status(200).json({ message: 'Post modifié !'}))
               .catch(error => res.status(400).json({ error }));
      }
      else{
        postObject= { ...JSON.parse(req.body.post)};
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
      }
    }
    else{
      res.status(403).json({message: 'Opération non autorisée!'});
    }
  })
  .catch(error => res.status(500).json({ error }));
};


/**
 * Supprime le massage a partir de l'id de la request
 * verifie si le user qui envoi la request est bien le createur du message
 * avec filesystem permet de supprimer aussi le fichier correspondant dans le disk dans image
 * une fois le fichier supprimé on supprime le message de la base
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if((post.employeeId === req.employeeId)||(req.admin)){
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Message suppriméé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
      else{
        res.status(403).json({message:'Opération non autorisée!'});
      }
    })
    .catch(error => res.status(500).json({ error }));
};


/**
 * A partir de la valeur like dans la request :0,1,-1 on choit l'action a realiser (annuler,liker,dislike)
 * a partir de id du message on regarde s'il existe apres selon la valeur de like on realise l'action souhaité
 * @param {request} req 
 * @param {response} res 
 * @param {middleware} next 
 */
exports.likePost = (req, res, next) => {

   Post.findOne({_id : req.params.id})
    .then(post => {
      const id=req.body.employeeId; 

     
      console.log('body',req.body)
      console.log('params',req.params)

      if(req.body.like === 1){
         if(!post.usersLiked.includes(id)){
            post.usersLiked.push(id);
            post.likes = post.likes +1 ;
         }         
      }
      else if (req.body.like === 0){
        if(post.usersLiked.includes(id)){
          const index = post.usersLiked.indexOf(id);
          if(index>-1){
             post.usersLiked.splice(index,1);
             post.likes = post.likes - 1;
          }
        }
        if(post.usersDisliked.includes(id)){
          const index = post.usersDisliked.indexOf(id);
          if(index>-1) {
            post.usersDisliked.splice(id,1);
            post.dislikes = post.dislikes -1;
          }
        }
      }
      else if (req.body.like === -1){
          if(!post.usersDisliked.includes(id)){    
              post.usersDisliked.push(id);
              post.dislikes =post.dislikes + 1;            
          }
      }
      
      const postObj = {
        employeeId : post.employeeId, 
        message:post.message, 
        imageUrl : post.imageUrl,
        likes : post.likes,
        dislikes : post.dislikes,
        usersLiked : post.usersLiked,
        usersDisliked :post.usersDisliked    
      };


     // console.log('post',post)
     // console.log('postObj',postObj)

      Post.updateOne({ _id: req.params.id }, { ...postObj, _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Post modifiée !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({error}));
};