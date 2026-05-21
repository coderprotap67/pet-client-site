import { NextResponse } from "next/server";

export async function GET(request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
    const headers = new Headers(request.headers);
  
  const response = await fetch(backendUrl, {
    method: "GET",
    headers: headers,
    redirect: "manual", 
  });
  const newResponse = new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });

  return newResponse;
}
export async function POST(request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}${request.nextUrl.pathname}`;
  
  const body = await request.json();

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Object.fromEntries(request.headers.entries()),
    },
    body: JSON.stringify(body),
  });
  const newResponse = new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
  return newResponse;
}