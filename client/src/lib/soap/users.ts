import axios from "axios";

import type { User } from "@/src/types/user";

const SOAP_URL = "http://localhost:1048/api/soap";

const buildSoapEnvelope = (body: string) => `
<soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    ${body}
  </soap:Body>
</soap:Envelope>
`;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const getTextContent = (parent: Element, tagName: string) =>
  parent.getElementsByTagName(tagName)[0]?.textContent?.trim() ?? "";

const extractUsersFromXml = (xml: string): User[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "application/xml");
  const parseError = xmlDoc.getElementsByTagName("parsererror")[0];

  if (parseError) {
    throw new Error("Invalid XML response from server");
  }

  const userNodes = Array.from(xmlDoc.getElementsByTagName("user"));

  return userNodes.map((node) => ({
    id: getTextContent(node, "id"),
    name: getTextContent(node, "name"),
    email: getTextContent(node, "email"),
  }));
};

const sendSoapRequest = async (body: string) => {
  const response = await axios.post(SOAP_URL, buildSoapEnvelope(body), {
    headers: { "Content-Type": "text/xml" },
    responseType: "text",
  });

  return typeof response.data === "string" ? response.data : String(response.data);
};

export const userSoapApi = {
  list: async () => {
    const xml = await sendSoapRequest("<getAllUsersRequest />");
    return extractUsersFromXml(xml);
  },
  create: async (payload: { name: string; email: string; password: string }) => {
    const fields = [
      `<name>${escapeXml(payload.name)}</name>`,
      `<email>${escapeXml(payload.email)}</email>`,
      `<password>${escapeXml(payload.password)}</password>`,
    ].join("");

    return sendSoapRequest(`<createUserRequest>${fields}</createUserRequest>`);
  },
  update: async (payload: {
    id: string;
    name: string;
    email: string;
    password?: string;
  }) => {
    const fields = [
      `<id>${escapeXml(payload.id)}</id>`,
      `<name>${escapeXml(payload.name)}</name>`,
      `<email>${escapeXml(payload.email)}</email>`,
      ...(payload.password ? [`<password>${escapeXml(payload.password)}</password>`] : []),
    ].join("");

    return sendSoapRequest(`<updateUserRequest>${fields}</updateUserRequest>`);
  },
  remove: async (id: string) => {
    return sendSoapRequest(
      `<deleteUserRequest><id>${escapeXml(id)}</id></deleteUserRequest>`
    );
  },
};
