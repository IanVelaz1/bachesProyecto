const fileUpload=require('express-fileupload');
const fs=require('fs');
const path=require('path');
module.exports=(app,upload)=>{
    app.post('/imagenes/:idUsuario',(req,res)=>{
        console.log('imagen');
        console.log(req.files.file);
        let archivo=req.files.file;
        let splitExt=req.files.file.name.split('.');
        let arrayExtensiones=['png','jpg','gif','jpeg'];
        let idUsuario=req.params.idUsuario;
        let extensionArchivo=splitExt[splitExt.length-1];
        let nombreImagen=splitExt[0];

        if(arrayExtensiones.indexOf(extensionArchivo)<0){
        res.status(400).json({error:'extension invalida',success:false});
        }else{
            
         let imagen=`${nombreImagen}-${new Date().getMilliseconds()}-${idUsuario}.${extensionArchivo}`;
            console.log(nombreImagen);
            
         archivo.mv(`imagenes/${imagen}`,(error)=>{
             if(error){
                 res.status(400).json({success:false,error:'error al subir imagen'});
             }else{
                 res.status(200).json({success:true,imagen:imagen}).sendFile(__dirname,`../../imagenes/${imagen}`);

             }
         });
        }
 
        
    });

    app.get('/imagenes/:nombre',(req,res)=>{
        let nombre=req.params.nombre;
        let pathImg=path.resolve(__dirname,`../../imagenes/${nombre}`);
        let pathNotFound=path.resolve(__dirname,"../../assets/noimgfound.jpg");

        if(fs.existsSync(pathImg)){
            res.sendFile(pathImg);
        }else{
            res.sendFile(pathNotFound);
        }
    });
}