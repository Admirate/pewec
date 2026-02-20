import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();

  console.log("Form data:", body);
// dummy API
  return NextResponse.json({
    success: true,
    message: "Form submitted successfully",
  });
}
