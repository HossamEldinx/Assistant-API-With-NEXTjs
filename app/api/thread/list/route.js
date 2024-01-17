import { NextResponse } from "next/server";
import * as dotenv from "dotenv";

export async function GET(req) {
  const url = "https://api.openai.com/v1/threads";

  
  const headers = new Headers({
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  });

  fetch(url, { method: "GET", headers: headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      console.log(data);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
}
