
require('dotenv').config();

module.exports = {
    
    development: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        migrationStorageTableSchema: 'public', 
        seederStorageTableSchema: 'public'  
    },
    
    
    test: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        schema   : 'proyecto'
    },
    
   
    production: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        schema   : 'proyecto'
    }
};