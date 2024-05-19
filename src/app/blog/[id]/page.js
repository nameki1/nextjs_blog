import { client } from "@/lib/client";
import { renderToc } from "@/lib/render-toc";
import Image from "next/image";
import styles from "@/app/style/common.module.css";
import dayjs from "dayjs";
import Link from "next/link";
import { renderHighlighted } from "@/lib/render-highlighted";
import markdownToHtml from "zenn-markdown-html";
import { getPost } from "@/utils/getPost";
import { getPostContent } from "@/utils/getPostContent";
import { RxUpdate } from "react-icons/rx";
import { SmTOC } from "@/app/components/smTOC";

export default async function BlogArticle(context) {
  // 特定の記事情報の取得（引数:slug）
  const post = await getPost(context.params.id);
  // 特定の記事内容の取得（引数:id）
  const post_content = await getPostContent(post.id);
  // マークダウンをHTMLに変換
  const renderHtml = markdownToHtml(post_content.parent || "", {
    embedOrigin: "https://embed.zenn.studio",
  });
  // 目次の作成
  const toc = renderToc(renderHtml);

  return (
    <main id="pageTop">
      {/* スマホ用目次 */}
      <SmTOC toc={toc} />
      <div className="pt-16 mb-12 md:mb-24">
        {/* アイキャッチ */}
        <Image
          src={post.eyeCatch}
          width={700}
          height={150}
          alt="Picture of the author"
          className="mx-auto"
        />
        {/* 記事タイトル */}
        <h1 className=" font-bold text-3xl mt-16 mb-5 text-center">
          {post.title}
        </h1>
        {/* 投稿日時 と 修正日時*/}
        <div className="flex justify-center items-center">
          <p className="pr-5">
            <time>{post.publishedAt}</time>
            に公開
          </p>
          <RxUpdate />
          <p className="pl-1">
            <time>{post.updateAt}</time>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* 記事 */}
        <div className="bg-white py-10 px-5 md:p-10 md:col-span-2 ">
          <article>
            {/* タグ */}
            <div className="flex flex-wrap">
              {post.tags.map((tag, index) => (
                <button
                  key={index}
                  className="mr-5 py-1 px-3 rounded-full border-solid border-2 border-[#769cbf] hover:bg-[#769cbf] hover:text-white"
                >
                  <Link
                    href={`/category/${tag}`}
                    className="text-sm font-medium"
                  >
                    {tag}
                  </Link>
                </button>
              ))}
            </div>
            <div
              className="znc"
              dangerouslySetInnerHTML={{ __html: renderHtml }}
            ></div>
          </article>
        </div>
        {/* 目次 */}
        <div className="hidden col-span-1 sm:block">
          <div className=" bg-white py-10 px-6 ml-5 sticky top-0">
            <div className="">
              <h3 className=" font-bold">目次</h3>
              <ul className="text-sm text-gray-600">
                {toc.map((data) =>
                  data.name == "h1" ? (
                    // h1のとき
                    <div key={data.id} className="flex my-2 pr-3 pl-3">
                      <p className="pt-1 text-xs">●</p>
                      <li className="pl-3 font-bold">
                        <a href={`#${data.id}`}>{data.text}</a>
                      </li>
                    </div>
                  ) : (
                    //  h2のとき
                    <div key={data.id} className="flex my-2 pr-3 pl-2">
                      <p className="text-xl">・</p>
                      <li className="pt-1 pl-3">
                        <a href={`#${data.id}`}>{data.text}</a>
                      </li>
                    </div>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
