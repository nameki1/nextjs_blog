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
    <main>
      <div className="pt-16 mb-24">
        {/* アイキャッチ */}
        <Image
          src={post.eyeCatch}
          width={400}
          height={500}
          alt="Picture of the author"
          className="mx-auto"
        />
        {/* 記事タイトル */}
        <h1 className=" text-3xl mt-16 mb-5 text-center">{post.title}</h1>
        {/* 投稿日時 と 修正日時*/}
        <div>
          <dl className="flex justify-center">
            <dt className={styles.srOnly}>Published on</dt>
            <dd>
              投稿日時：
              <time dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format("YYYY/MM/DD")}
              </time>
            </dd>
            <dt className={styles.srOnly}>Updated on</dt>
            <dd className=" ml-4">
              更新日時：
              <time dateTime={post.updatedAt}>
                {dayjs(post.updatedAt).format("YYYY/MM/DD")}
              </time>
            </dd>
          </dl>
        </div>
      </div>
      <div className="flex justify-between">
        {/* 目次 */}
        <div className=" hidden sm:flex max-h-screen pt-5 min-w-[300px] max-w-[300px]  overflow-auto bg-white">
          <div className=" py-4 px-6">
            <h3 className=" font-bold">目次</h3>
            <ul>
              {toc.map((data) => (
                <li key={data.id}>
                  <a href={`#${data.id}`} className="py-2 px-3 text-sm">
                    {data.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 記事 */}
        <div>
          <article className="znc min-w-[790px] px-10 py-9 bg-white">
            {/* カテゴリ */}
            <div className="flex flex-wrap mb-5">
              {post.tags.map((cate, index) => (
                <Link
                  key={index}
                  href={`/category/${cate}`}
                  className="mr-3 text-sm font-medium"
                >
                  {cate}
                </Link>
              ))}
            </div>
            <p>{post.category}</p>
            <div dangerouslySetInnerHTML={{ __html: renderHtml }}></div>
          </article>
        </div>
      </div>
    </main>
  );
}

// // シンタックスハイライトの適用
// export async function getStaticProps(context) {
//   const id = context.params.id;
//   const data = await client.get({
//     endpoint: "blogs",
//     contentId: id,
//   });
//   const blog = await data.json();
//   const $ = load(blog.body);

//   $("pre code").each((_, elm) => {
//     const result = hljs.highlightAuto($(elm).text());
//     $(elm).html(result.value);
//     $(elm).addClass("hljs");
//   });

//   return {
//     props: {
//       blog,
//       highlightedBody: $.html(),
//     },
//   };
// }
//   const res = await fetch(
//     `https://hogehoge.microcms.io/api/v1/blogs/${id}`,
//     key
//   );
//   const blog = await res.json();
//   const $ = cheerio.load(blog.body);

//   $("pre code").each((_, elm) => {
//     const result = hljs.highlightAuto($(elm).text());
//     $(elm).html(result.value);
//     $(elm).addClass("hljs");
//   });
//   return {
//     props: {
//       data,
//       highlightedBody: $.html(),
//     },
//   };
// };
