import { NextResponse } from "next/server";
import { createMessage, getMessages } from "../../utils/OpenAI";

//create new messag
export async function POST(req) {
  try {
    const formData = await req.formData();
    let threadId = formData.get("threadId");
    let content = formData.get("content");

    if (!threadId || !content) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    let newMessage = await createMessage({ threadId, content });

    return NextResponse.json({ message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


//get all message using thread id
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("threadId");

    //error if missing
    if (!query) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }

    let messages = await getMessages(query);

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
