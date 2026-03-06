import { Builder } from 'xml2js';

export const jsonToXml = (operationType: string, payload: any) => {
    const builder = new Builder({ headless: true });

    const responseTag = operationType.replace('Request', 'Response');

    const soapResponse = {
        "soap:Envelope": {
            $: { "xmlns:soap": "https://schemas.xmlsoap.org/soap/envelope/" },
            "soap:Body": {
                [responseTag]: {
                    user: Array.isArray(payload)
                        ? payload.map(u => ({
                            id: u.id,
                            name: u.name,
                            email: u.email
                        }))
                        : payload
                }
            }
        }
    };

    return builder.buildObject(soapResponse);
}

