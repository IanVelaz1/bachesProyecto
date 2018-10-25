const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const usuarioSchema=new mongoose.Schema({

nombre:{
    type:String,
    default:""
},
mail:{
    type:String,
    default:""
},
contraUser:{
    type:String,
    default:""
}

});

const Usuario=module.exports=mongoose.model(usuarioSchema);

module.exports.guardarUsuario=(user,callback)=>{
    bcrypt.genSalt(10,(error,salt)=>{
        bcrypt.hash(user.contraUser,salt,(error,hash)=>{
           if(error){
               throw error
           }else{
               user.contraUser=hash;
               Usuario.create(user,callback);
           }
        });
    })
}

module.exports.compararContra=(contra,hash,callback)=>{
   bcrypt.compare(contra,hash,(error,isMatch)=>{
      if(error){
        throw error;
      }else{
        callback(null,isMatch);
      }
   });
}

module.exports.recuperarUsuarios=(usuarios,callback)=>{
    Usuario.find(usuarios,callback);
}

module.exports.recuperarUsuarioEspecifico=(id,callback)=>{
    Usuario.findById(id,callback);
}

module.exports.recuperarUsuarioByMail=(emailUser,callback)=>{
    Usuario.find({mail:emailUser},callback);
}

