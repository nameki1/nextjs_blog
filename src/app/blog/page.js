import { client } from "@/lib/client";
import Link from "next/link";
import styles from "../style/common.module.css";
import dayjs from "dayjs";
import { getAllPosts } from "@/utils/getAllPosts";
import Image from "next/image";

export default async function Home() {
  // 記事一覧の取得
  const AllPostsList = await getAllPosts();
  // タグ一覧の取得
  const tags = [...new Set(AllPostsList.flatMap((post) => post.tags))];

  return (
    <main>
      <div className="grid grid-cols-1 py-5 md:grid-cols-3 md:pb-6 md:pt-12">
        {/* ブログ記事一覧の表示 */}
        <div className="py-3 bg-white col-span-2">
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
            {AllPostsList.map((value, index) => (
              <li key={index}>
                <article className=" shadow-tint hover:shadow-2xl">
                  {/* 全体をリンク化 */}
                  <Link
                    href={{
                      pathname: `/blog/${value.slug}`,
                      query: { id: value.id },
                    }}
                  >
                    {/* アイキャッチ */}
                    <Image
                      src={value.eyeCatch}
                      width={200}
                      height={100}
                      alt="Picture of the author"
                      className="mx-auto"
                    />
                    <div className=" p-5">
                      {/* 投稿日時 */}
                      <p className=" font-tint-400 mb-1 block text-xs">
                        <time>{value.publishedAt}</time>
                      </p>
                      {/* ブログタイトル */}
                      <h2 className="text-base">{value.title}</h2>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
        {/* タグ一覧の表示 */}
        <div className=" order-first md:order-last md:max-h-screen md:pt-5 md:ml-5 md:px-5 overflow-auto bg-white col-span-1">
          <h3 className="  mt-5 mb-10 text-3xl">すべての記事</h3>
          <div className="order-first items-start flex overflow-x-scroll  md:order-last md:flex-wrap md:overflow-x-hidden">
            {tags.map((value, index) => (
              <button
                key={index}
                className="my-3 mr-5 py-1 px-3 bg-gray-200 rounded-full"
              >
                <Link href={`/category/${value}`} className="py-2 px-3 ">
                  {value}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
