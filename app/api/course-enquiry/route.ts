import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Course enquiry:", body);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
