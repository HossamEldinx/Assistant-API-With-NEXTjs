import { NextResponse } from "next/server";
import { getAllAssitants } from "../../../utils/OpenAI";

//get assistant
export async function GET(req) {
  try {
    let assistants = await getAllAssitants();
    return NextResponse.json({ assistants : assistants.data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
