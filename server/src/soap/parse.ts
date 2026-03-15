import { parseStringPromise, processors } from "xml2js";

export const parseXml = async (xml: string) => {
    const parsedData = await parseStringPromise(xml, {
        explicitArray: false,
        trim: true,
        tagNameProcessors: [processors.stripPrefix],
    });

    const envelope = parsedData?.Envelope;
    const body = envelope?.Body;

    if (!body || typeof body !== "object") {
        throw new Error("Invalid SOAP body");
    }

    const operationType = Object.keys(body)[0];
    const payload = body[operationType];

    return { operationType, payload };
};
