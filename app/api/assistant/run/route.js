import { NextResponse } from "next/server";
import { runCheck, runAssistant } from "@/app/utils/OpenAI";

//run the assistant
export async function POST(req) {
  try {
    const formData = await req.formData();
    let threadId = formData.get("threadId");
    let assistantId = formData.get("assistantId");
    let instructions = formData.get("instructions");

    //check if the fields are empty
    if (!assistantId || !threadId || !instructions) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    let assistant = await runAssistant({
      assistantId,
      threadId,
      instructions,
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
