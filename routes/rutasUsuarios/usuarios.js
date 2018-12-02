 let Usuario=require('../../models/modelsUsuarios/usuario');
 let jwt=require('jsonwebtoken');
 let config=require('../../config/config');
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

 app.post('/login',(req,res)=>{
    let mail=req.body.mail;
    let password=req.body.contraUser;
    console.log(req.body);
     Usuario.recuperarUsuarioMail(mail,(error,user)=>{
       if(error){
         res.status(404).json(error);
       }
      console.log(user);
         try{
           Usuario.compararContra(password,user[0].contraUser,(error,isMatch)=>{
              if(error){
                res.status(401).json({success:false,msg:"contraseña incorrecta"});
              }else if(isMatch){
                let token=jwt.sign(user[0].toJSON(),config.secret,{expiresIn:7200});
                res.status(200).json({
                success:true,
                 token:"bearer "+token,
                 user:user[0]
                })
              }else{
                res.json({success:false,msg:"contraseña incorrecta"});
              }
           });
         }catch(TypeError){
          res.json({success:false,msg:"usuario no encontrado"})
       }
     });

     

 });

 app.get('/usuario/:mail',(req,res)=>{
    Usuario.recuperarUsuarioMail(req.params.mail,(error,usuario)=>{
       if(error){
         res.status(204).json({error:error,msg:'no se encontro usuario'});
       }else{
         res.status(200).json(usuario);
       }
    });
 });

 app.get('/usuario/:id',(req,res)=>{
   Usuario.recuperarUsuarioEspecifico(req.params.id,(error,usuario)=>{
    if(error){
      res.status(204).json({error:error,msg:'no se encontro usuario'});
    }else{
      res.status(200).json(usuario);
    }
   });
 });

 app.put('/usuario/:id',(req,res)=>{
   let id=req.params.id;
   let usuario=req.body;
   Usuario.editarUsuario(id,usuario,(error,user)=>{
    if(error){
      res.status(204).json({error:error,msg:'error al editar usuario'});
    }else{
      res.status(200).json(user);
    }
   });
 });

}