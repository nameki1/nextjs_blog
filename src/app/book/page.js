import { getBookList } from "@/utils/getBookList";
import Link from "next/link";
import Image from "next/image";

export default async function Book() {
  const bookList = await getBookList();

  return (
    <main>
      <div className="pt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {bookList.map((value, index) => (
          <li
            key={index}
            className="list-none p-2 bg-white border-solid border-4 rounded-lg hover:border-[#769cbf]"
          >
            <article className=" ">
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
                  width={150}
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
