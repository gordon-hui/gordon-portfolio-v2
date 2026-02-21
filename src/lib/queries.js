import { client } from "./sanity";

export async function getAllPosts() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "tags": tags[]->title,
      mainImage
    }`
  );
  return posts;
}

export async function getRecentPosts(count = 3) {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$count] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "tags": tags[]->title,
      mainImage
    }`,
    { count }
  );
  return posts;
}

export async function getPostBySlug(slug) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "tags": tags[]->title,
      mainImage,
      body
    }`,
    { slug }
  );
  return post;
}

export async function getAllTags() {
  const tags = await client.fetch(
    `*[_type == "tag"] | order(title asc) {
      _id,
      title
    }`
  );
  return tags;
}
