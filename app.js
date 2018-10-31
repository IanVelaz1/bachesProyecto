const express=require('express'),
app=express(),
bodyParser=require('body-parser'),
cors=require('cors'),
morgan=require('morgan'),
mongoose=require('mongoose'),
config=require('./config/config'),
passport=require('passport'),
helmet=require('helmet'),
path=require('path');

let port =process.env.PORT | 8000;

mongoose.connect(config.db);
mongoose.Promise=global.Promise;

///middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/rutasUsuarios/usuarios')(app);

app.use(express.static(path.join(__dirname,"dist")));

app.all('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"dist/index.html"));
});

app.listen(port,(req,res)=>{
   console.log('conectado en '+port);
   
});