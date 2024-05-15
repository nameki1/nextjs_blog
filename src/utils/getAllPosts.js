import { notion } from "@/lib/notion";

export async function getAllPosts() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });
  const posts = response.results;
  const AllPostsList = posts.map((post) => {
    //console.log(post);
    //レコードidの取り出し
    const id = post.id;
    //titleの取り出し
    const title = post.properties.title.title[0].plain_text;
    // publishedの取り出し
    const published = post.properties.published.checkbox;
    // tagsの取り出し
    const tags = post.properties.tags.multi_select.map((item) => item.name);
    // categoryの取り出し
    const category = post.properties.category.select.name;
    // overviewの取り出し
    const overview = post.properties.overview.rich_text[0].plain_text;
    // publishedAtの取り出し
    const publishedAt = post.properties.publishedAt.date.start;
    //updateAtの取り出し
    const updateAt = post.properties.updateAt.date.start;
    //eyeCatchの取り出し
    const eyeCatch = post.properties.eyeCatch.files[0].file.url;
    //slugの取り出し
    const slug = post.properties.slug.rich_text[0].plain_text;

    return {
      id,
      title,
      published,
      tags,
      category,
      overview,
      publishedAt,
      updateAt,
      eyeCatch,
      slug,
    };
  });
  return AllPostsList;
}
