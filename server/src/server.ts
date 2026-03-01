import http from 'http';
import app from './app.ts';


const server = http.createServer(app);


server.listen(4000, () => {
    console.log(`server is running on port ${process.env.PORT}`); 
})