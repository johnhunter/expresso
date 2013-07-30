var path    = require('path');
var express = require('express');
var hogan   = require('hogan-express')
var app     = express();



app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('partials', { head: 'head' });
    //app.enable('view cache');
    app.engine('html', hogan);
    
    app.use(express.compress());
    
    app.use(app.router);
    app.use(express.bodyParser());

    app.use(express.static(path.join(__dirname, 'public')));
});




app.get('/', function (req,res) {
    res.locals = { what: 'World' };
    res.render('index', { partials: {temp: 'temp'} }); 
});


app.use(function(req, res, next){
  res.send(404, '<h1>Sorry cant find that!</h1>');
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
