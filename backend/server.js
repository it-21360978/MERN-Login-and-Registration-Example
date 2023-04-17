import express  from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/db.js';
import router from './router/route.js';





const app = express();

/**middleware */

app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));
app.disable('x-powered-by');// less hackers know about stack


const PORT = 8080;

/**http get request */
app.get('/',(req,res) =>{

    res.status(201).json('Home get request');

});
/**api browse route */
app.use('/user',router);


/**start server */
connect().then(()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`);
        })
        
    } catch (error) {
        console.log('cannot connect ');
    }
}).catch(error =>{
    console.log('invalid database connection');
})
