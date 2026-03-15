import { Builder } from 'xml2js';

const serializeUser = (user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
});

export const jsonToXml = (operationType: string, payload: any) => {
    const builder = new Builder({ headless: true });

    const responseTag = operationType.replace('Request', 'Response');
    const responseBody = Array.isArray(payload)
        ? {
            user: payload.map(serializeUser)
        }
        : payload && typeof payload === 'object' && 'id' in payload
            ? {
                user: serializeUser(payload)
            }
            : payload;

    const soapResponse = {
        "soap:Envelope": {
            $: { "xmlns:soap": "https://schemas.xmlsoap.org/soap/envelope/" },
            "soap:Body": {
                [responseTag]: responseBody
            }
        }
    };

    return builder.buildObject(soapResponse);
}

