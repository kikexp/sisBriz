const express = require('express');
const app = express();
const path = require('path');

app.use(express.static( './dist/SisBriz' ));


app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'dist/SisBriz/index.html'));
})

app.listen(process.env.PORT || 8080,()=>{
	console.log('console escuchando');
});

