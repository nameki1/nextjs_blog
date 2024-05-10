import { client } from "@/lib/client";
import Link from "next/link";

export default async function Category() {
  // カテゴリ一覧の取得
  const categories = await client.get({
    endpoint: "categories",
  });

  return (
    <main>
      <div className="flex justify-center items-center pt-36">
        <div>
          <h1 className=" text-4xl mr-5 border-r-2 pr-4">カテゴリ</h1>
        </div>
        {/* カテゴリ一覧の表示 */}
        <div className="flex flex-wrap max-w-lg">
          {categories.contents.map((value, index) => (
            <div key={index} className="my-2 mr-5">
              <Link href={`/category/${value.id}`} className="mr-3">
                {value.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
