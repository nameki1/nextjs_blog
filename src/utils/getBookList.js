import { notion } from "@/lib/notion";

export async function getBookList() {
  const response = await notion.databases.query({
    database_id: process.env.BOOK_DATABASE_ID,
  });
  const posts = response.results;
  console.log(posts);
}
