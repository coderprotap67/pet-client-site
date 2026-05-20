import { NextResponse } from "next/server";

export async function GET(request) {
  // পাথ এবং কুয়েরি স্ট্রিং যুক্ত করা
  const backendUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
  
  // ক্লায়েন্ট থেকে আসা হেডার্স এবং কুকিজ কপি করা
  const headers = new Headers(request.headers);
  
  const response = await fetch(backendUrl, {
    method: "GET",
    headers: headers,
    redirect: "manual", // এটি খুব জরুরি, রিডাইরেক্ট নিজে হ্যান্ডেল করতে সাহায্য করে
  });

  // রেসপন্স হেডার্স এবং কুকিজ ক্লায়েন্টে ফেরত পাঠানো
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