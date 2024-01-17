import { NextResponse } from "next/server";

//get all message using thread id
export async function GET(req) {
  try {
/*  */

    return NextResponse.json({ message:'text hello world' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
