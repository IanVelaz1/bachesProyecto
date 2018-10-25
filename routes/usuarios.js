 let Usuario=require('../models/usuario');
 let jwt=require('jsonwebtoken');
 let config=require('../config/config');
module.exports=(app)=>{
  
 app.post('/usuario',(req,res)=>{
    let usuario=req.body;
    Usuario.guardarUsuario(usuario,(error,user)=>{
     if(error){
       res.json({error:error,msg:'error al crear usuario',success:false});
     }else{
       res.json({success:true,user});
     }
    });
 });

 app.post('/usuario/login',(req,res)=>{
    let mail=req.body.mail;
    let password=req.body.contraUser;
     Usuario.recuperarUsuarioByMail(mail,(error,user)=>{
       if(error){
        res.json({success:false,msg:"mail no encontrado"});
       }if(!user){
        res.json({success:false,msg:"mail incorrecto"});
       }try{
          Usuario.compararContra(password,user.contraUser,(error,isMatch)=>{
              if(error){
                res.json('contraseña incorrecta');
              }else if(isMatch){
                const token=jwt.sign(user.toJSON(),config.secret,{expiresIn:7200});
                res.json({
                    success:true,
                    token:"bearer "+token,
                    user:{
                        id:user._id,
                        email:user.emailUser,
                        contra:user.contraUser
                      }
                })
              }else{
                res.json({success:false,msg:"contraseña incorrecta"});
              }
          });
       }catch(TypeError){
        console.log("error usuario no encontrado");
       }
     });

 });

}