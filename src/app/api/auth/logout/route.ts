import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
  const res = NextResponse.json({message: 'logged out'}, {status: 200});
  res.cookies.delete('userId');
  res.cookies.delete('userName');
  res.cookies.delete('userRole');
  res.cookies.delete('isUserActive');
  res.cookies.delete('authToken');
  return res;
}