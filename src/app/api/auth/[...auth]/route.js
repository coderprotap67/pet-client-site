import { createAuthClient } from "better-auth/react";
import { NextResponse } from "next/server";

export async function GET(request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
  
  const response = await fetch(backendUrl, {
    method: "GET",
    headers: request.headers,
  });

  return response;
}

export async function POST(request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}${request.nextUrl.pathname}`;
  const body = await request.json();

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify(body),
  });

  return response;
}