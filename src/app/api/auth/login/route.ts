import { IAuthObject } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  const req = await request.json();
  const api_req = await fetch(process.env.NEXT_PUBLIC_API_URL!.concat('auth/login'),{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(req),
  });
  if(!api_req.ok) {
    return NextResponse.json(api_req);
  }
  const data: IAuthObject = await api_req.json();
  const res = NextResponse.json({...data}, {status: 200});
  res.cookies.set('userId', String(data.id), {sameSite: 'strict'});
  res.cookies.set('userName', String(data.name), {sameSite: 'strict'});
  res.cookies.set('userRole', String(data.role), {sameSite: 'strict'});
  res.cookies.set('isUserActive', String(data.isActive), {sameSite: 'strict'});
  res.cookies.set('authToken', String(data.access_token), {sameSite: 'strict'});
  return res;
}