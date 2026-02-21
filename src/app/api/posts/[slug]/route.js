import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/queries";

export async function GET(request, { params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
