import { client } from "@/lib/client";
import Link from "next/link";

export default async function Category_sort(context) {
  // ブログ記事一覧の取得
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "-createdAt",
      filters: `category[equals]${id}`,
    },
  });

  // カテゴリ一覧の取得
  const categories = await client.get({
    endpoint: "categories",
  });

  return (
    <main>
      {/* ブログ記事一覧の表示 */}
      {data.contents.map((value, index) => (
        <li key={index}>
          <Link href={`/blog/${value.id}`}>{value.title}</Link>
        </li>
      ))}
      {/* カテゴリ一覧の表示 */}
      <div>
        <ul>
          {categories.contents.map((value, index) => (
            <li key={index}>
              <Link href={`/category/${value.id}`}>{value.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
