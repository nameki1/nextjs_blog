import { client } from "@/lib/client";
import Link from "next/link";
import styles from "../style/common.module.css";
import dayjs from "dayjs";

export default async function Home() {
  // ブログ記事一覧の取得
  const data = await client.get({
    endpoint: "blogs",
  });
  console.log(data);
  data.contents.map((value, index) => console.log(value.category));
  // カテゴリ一覧の取得
  const categories = await client.get({
    endpoint: "categories",
  });

  return (
    <main>
      <div className="pb-6 pt-6">
        <h2 className="sm:hidden text-3xl font-bold">All Posts</h2>
      </div>
      <div className="flex justify-between">
        {/* カテゴリ一覧の表示 */}
        <div className=" hidden sm:flex max-h-screen pt-5 min-w-[300px] max-w-[300px]  overflow-auto bg-white">
          <div className=" py-4 px-6">
            <h3 className=" font-bold">カテゴリ</h3>
            <ul>
              {categories.contents.map((value, index) => (
                <li key={index} className="my-3">
                  <Link href={`/category/${value.id}`} className="py-2 px-3 ">
                    {value.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ブログ記事一覧の表示 */}
        <div className="p-5 bg-white min-w-[790px]">
          <ul>
            {data.contents.map((value, index) => (
              <li key={index} className=" py-5">
                <article>
                  {/* 投稿日時 */}
                  <dl>
                    <dt className={styles.srOnly}>Published on</dt>
                    <dd>
                      <time dateTime={value.publishedAt}>
                        {dayjs(value.publishedAt).format("YYYY/MM/DD")}
                      </time>
                    </dd>
                  </dl>
                  <div>
                    {/* ブログタイトル */}
                    <h2 className=" font-bold text-xl">
                      <Link href={`/blog/${value.id}`}>{value.title}</Link>
                    </h2>
                    {/* カテゴリ */}
                    <div className="flex flex-wrap">
                      {value.category.map((cate, index) => (
                        <Link
                          key={index}
                          href={`/category/${cate.id}`}
                          className="mr-3 text-sm font-medium"
                        >
                          {cate.name}
                        </Link>
                      ))}
                    </div>
                    {/* 概要 */}
                    <div className="mt-3 max-w-none">{value.summary}</div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
