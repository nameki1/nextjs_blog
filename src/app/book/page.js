import { getBookList } from "@/utils/getBookList";
import Link from "next/link";
import Image from "next/image";

export default async function Book() {
  const bookList = await getBookList();

  return (
    <main>
      <div className="grid grid-cols-3 gap-3">
        {bookList.map((value, index) => (
          <li key={index}>
            <article className=" shadow-tint hover:shadow-2xl">
              {/* 全体をリンク化 */}
              <Link
                href={{
                  pathname: `/blog/${value.slug}`,
                  // query: { id: value.id },
                }}
              >
                {/* 表紙画像 */}
                <Image
                  src={value.cover}
                  width={200}
                  height={300}
                  fixed
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
      </div>
    </main>
  );
}
