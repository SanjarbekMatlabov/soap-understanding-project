import type {Request, Response} from "express";
import { parseXml } from "./parse.ts";
import { dispatch } from "./dispatch.ts";
import { jsonToXml } from "./build.ts";

export const pipeline =  async (req: Request, res: Response) => {
    const xml = req.body;
    const {operationType, payload} = await parseXml(xml);
    const result = await dispatch(operationType, payload);
    const responseXml = jsonToXml(operationType, result);

    res.set('Content-Type', 'application/xml');
    res.send(responseXml);
}