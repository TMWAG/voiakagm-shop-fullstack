import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  const req = await request.json();
  const api_req = await fetch(
    process.env.NEXT_PUBLIC_API_URL!.concat('auth/registration'),
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    }
  );
  return NextResponse.json(await api_req.json());
}