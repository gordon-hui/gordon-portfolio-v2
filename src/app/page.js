import Portfolio from "@/components/Portfolio";
import { getRecentPosts } from "@/lib/queries";

export default async function Home() {
  let posts = [];

  try {
    posts = await getRecentPosts(3);
  } catch (error) {
    // Sanity not configured yet — fallback to placeholder posts
    console.log("Sanity not configured, using placeholder posts");
  }

  return <Portfolio posts={posts} />;
}
