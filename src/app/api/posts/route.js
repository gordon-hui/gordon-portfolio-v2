import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/queries";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
