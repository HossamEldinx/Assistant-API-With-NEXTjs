import { NextResponse } from "next/server";
import { createThread, gethread, deleteThread } from "../../utils/OpenAI";

//create new thread
export async function POST(req) {
  try {
    let newThread = await createThread();

    return NextResponse.json(newThread);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}



//get thread
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const threadId = searchParams.get("threadId");

    //check if query is empty
    if (!threadId) {
      return NextResponse.json(
        { message: "threadId is required" },
        { status: 400 }
      );
    }

    let thread = await gethread(threadId);

    return NextResponse.json(thread);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}



//delete thread
export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const threadId = searchParams.get("threadId");

    //check if query is empty
    if (!threadId) {
      return NextResponse.json(
        { message: "threadId is required" },
        { status: 400 }
      );
    }

    let delThread = await deleteThread(threadId);

    return NextResponse.json(delThread);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
