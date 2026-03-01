import express from "express";
import dotenv from 'dotenv';
import soapRoute from './routes/soap.route.ts'
import bodyParser from "body-parser";

const app = express()
dotenv.config();


app.use(bodyParser.text({type: ["text/xml", "application/xml", "application/soap+xml"]}))


app.use('/api/soap',soapRoute)


export default app