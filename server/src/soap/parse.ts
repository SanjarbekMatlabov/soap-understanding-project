import {parseStringPromise} from 'xml2js';

export const parseXml = async (xml: string) => {
    const parsedData = await parseStringPromise(xml)

    const body = parsedData['soap:Envelope']['soap:Body']
   
    const operationType = Object.keys(body[0])[0]
    const payload = body[0][operationType]
    
    return {operationType, payload}
}
