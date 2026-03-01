"use client";
import axios from "axios";

const soapRequestToGetAllUsers = `
  <soap:Envelope xmlns:soap="">
    <soap:Body>
      <getAllUsersRequest>
      </getAllUsersRequest>
    </soap:Body>
  </soap:Envelope>
`;

export default function Home() {
  const getUsersHandler = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/soap",
      soapRequestToGetAllUsers,
    );
  };

  return (
    <>
      <button
        onClick={getUsersHandler}
        className="px-5 py-2.5 bg-amber-600 rounded-full"
      >
        GET ALL USERS
      </button>
    </>
  );
}
