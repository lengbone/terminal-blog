import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const posts = getAllPosts();
  
  const results = posts.filter((post) => {
    const searchContent = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
    return searchContent.includes(query);
  });

  return NextResponse.json({
    results: results.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
    })),
  });
}
