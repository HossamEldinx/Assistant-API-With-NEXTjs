import { NextResponse } from "next/server";
import {
  createAssistant,
  getAssistant,
  deleteAssistant,
} from "../../utils/OpenAI";


//api to hande creation of simple assistant
//or assistnt with files id 
export async function POST(req) {
  try {
    const formData = await req.formData();

    let name = formData.get("name");
    let instructions = formData.get("instructions");
    let fileId = formData.get("fileId");

    //check if the fields are empty
    if (!name || !instructions) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    let newAssistantData = { name: name, instructions: instructions };
    if (fileId) newAssistantData.fileId = fileId;

    let newAssistant = await createAssistant(newAssistantData);

    return NextResponse.json({ newAssistant });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//get assistant
export async function GET(req) {
  try {
    const assistantId = req.nextUrl.searchParams.get("assistantId");

    console.log(assistantId);
    //error if missing
    if (!assistantId) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }

    let assistant = await getAssistant(assistantId);

    return NextResponse.json({ assistant });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}



//delete assistant
export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const assistantId = searchParams.get("assistantId");

    //error if missing
    if (!assistantId) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }
    let delAssistant = await deleteAssistant(assistantId);

    return NextResponse.json({ delAssistant });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
