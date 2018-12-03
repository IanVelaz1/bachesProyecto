let mongoose=require('mongoose');

let reportesSchema=new mongoose.Schema({

categoria:{
  type:String,
  default:""
},
cliente:{
  _id:"",
  nombre:""
},
descripcion:{
  type:String,
  default:""
},
subCategoria:{
  type:String,
  default:""
},
ubicacion:{
  type:Object,
  default:{}
},
imagenes:{
  type:Array,
  default:[]
},
fechaReporte:{
  type:Date,
  default:new Date()
},
arrayImagenesData:{
  type:Array,
  default:[]
}


});

let Reporte=module.exports=mongoose.model('reportes',reportesSchema);

module.exports.guardarReportes=(reporte,callback)=>{
  Reporte.create(reporte,callback);
}

module.exports.recuperarReportes=(reportes,callback)=>{
  Reporte.find(reportes,callback);
}

module.exports.recuperarReporteEspecifico=(id,callback)=>{
  Reporte.findById(id,callback);
}

module.exports.editarReporte=(id,reporte,callback)=>{
  Reporte.findByIdAndUpdate(id,reporte,callback);
}

module.exports.eliminarReporte=(id,callback)=>{
  Reporte.findByIdAndRemove(id,callback);
}

module.exports.recuperarReporteIdUsuario=(idUsuario,callback)=>{
  Reporte.find({'cliente._id':idUsuario},callback).sort({fechaReporte:-1})
}

module.exports.recuperarReportesPosts=(reportes,callback)=>{
  Reporte.find(reportes,callback).sort({fechaReporte:-1});
}