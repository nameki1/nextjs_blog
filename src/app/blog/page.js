import { client } from "@/lib/client";
import Link from "next/link";
import styles from "../style/common.module.css";
import dayjs from "dayjs";
import { getAllPosts } from "@/utils/getAllPosts";

export default async function Home() {
  // 記事一覧の取得
  const AllPostsList = await getAllPosts();
  // カテゴリ一覧の取得
  const categories = [
    ...new Set(
      AllPostsList.map((cate) => {
        return cate.category;
      })
    ),
  ];

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
              {categories.map((value, index) => (
                <li key={index} className="my-3">
                  <Link href={`/category/${value}`} className="py-2 px-3 ">
                    {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ブログ記事一覧の表示 */}
        <div className="p-5 bg-white min-w-[790px]">
          <ul>
            {AllPostsList.map((value, index) => (
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
                      <Link
                        href={{
                          pathname: `/blog/${value.slug}`,
                          query: { id: value.id },
                        }}
                      >
                        {value.title}
                      </Link>
                    </h2>
                    {/* タグ */}
                    <div className="flex flex-wrap">
                      {value.tags.map((cate, index) => (
                        <Link
                          key={index}
                          href={`/category/${cate}`}
                          className="mr-3 text-sm font-medium"
                        >
                          {cate}
                        </Link>
                      ))}
                    </div>
                    {/* 概要 */}
                    <div className="mt-3 max-w-none">{value.overview}</div>
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
