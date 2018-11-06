let mongoose=require('mongoose');

let reportesSchema=new mongoose.Schema({

objReporte:{
    type:Object,
    default:{}
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