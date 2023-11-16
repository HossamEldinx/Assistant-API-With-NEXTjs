import { NextResponse } from "next/server";
import { runCheck } from "@/app/utils/OpenAI";

//run the assistant
export async function POST(req) {
  try {
    let { runId, threadId } = await req.json();

    //check if the fields are empty
    if (!runId || !threadId) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    let assistant = await runCheck({
      runId,
      threadId,
    });

    return NextResponse.json(assistant);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


