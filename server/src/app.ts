import express from "express";
import dotenv from 'dotenv';
import soapRoute from './routes/soap.route.ts'
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
dotenv.config();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "SOAPAction", "Authorization"],
}));

app.use(bodyParser.text({type: ["text/xml", "application/xml", "application/soap+xml"]}))

app.use('/api/soap',soapRoute)


export default app