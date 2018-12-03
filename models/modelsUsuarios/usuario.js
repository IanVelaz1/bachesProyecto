const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

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
},
delegacion:{
    type:String,
    default:""
},
reportes:{
    type:Array,
    default:[]
}

});

const Usuario=module.exports=mongoose.model('usuario',usuarioSchema);

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

module.exports.compararContra=(password,hash,callback)=>{
   bcrypt.compare(password,hash,(error,isMatch)=>{
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

module.exports.recuperarUsuarioMail=(emailUser,callback)=>{
    Usuario.find({mail:emailUser},callback);
}

module.exports.editarUsuario=(id,usuario,callback)=>{
    Usuario.findByIdAndUpdate(id,usuario,callback);
}
module.exports.eliminarUsuario=(id,callback)=>{
    Usuario.findByIdAndDelete(id,callback);
}

