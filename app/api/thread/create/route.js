import { NextResponse } from "next/server";
import { createAndRunThread } from "@/app/utils/OpenAI";

//create new thread
export async function POST(req) {
  try {
    let newThread = await createAndRunThread();
    console.log(newThread);
    return NextResponse.json(newThread);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
