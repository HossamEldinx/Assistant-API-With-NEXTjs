import { NextResponse } from "next/server";
import { UploadFile } from "../../utils/OpenAI";

//create new thread
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    let newFile = await UploadFile(file);

    return NextResponse.json(newFile);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
