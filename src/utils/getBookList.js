import { notion } from "@/lib/notion";
import { saveImage } from "@/utils/saveImage";

export async function getBookList() {
  const response = await notion.databases.query({
    database_id: process.env.BOOK_DATABASE_ID,
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
    // categoryの取り出し
    const category = post.properties.category.select.name;
    // publishedAtの取り出し
    const publishedAt = post.properties.publishedAt.date.start;

    //coverの取り出し
    let cover = "";
    // 保存先フォルダのパス
    const destinationPath = "public/bookImages/" + id;
    // 保存ファイル名
    const filename = "/cover.png";
    // 保存したい画像ファイルのリンク
    const url = post.properties.cover.files[0].file.url;
    if (saveImage(url, filename, destinationPath)) {
      cover = "/bookImages/" + id + filename;
    }

    //slugの取り出し
    const slug = post.properties.slug.rich_text[0].plain_text;

    return {
      id,
      title,
      published,
      category,
      publishedAt,
      cover,
      slug,
    };
  });
  return AllPostsList;
}
