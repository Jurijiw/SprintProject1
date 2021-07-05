const  yaml  =  require ('js-yaml');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');

function loadDocumentation(server){
    try { 
        const doc = yaml.load (fs.readFileSync('./src/middlewares/spec.yml','utf8')) ; 
        server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
    } catch (e){ 
        console.log (e) ; 
    }
}

module.exports = {
    loadDocumentation
}