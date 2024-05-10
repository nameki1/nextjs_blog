import * as cheerio from "cheerio";
import hljs from "highlight.js";

export const renderHighlighted = (context) => {
  const $ = cheerio.load(context);

  $("pre code").each((_, elm) => {
    console.log(elm); // コードブロックの要素をログに出力
    const result = hljs.highlightAuto($(elm).text());
    console.log(result); // ハイライトの結果をログに出力
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  console.log("aaa"); // デバッグ用のログ
  console.log($.html()); // 変更を加えた後のHTMLをログに出力
  console.log("aaa"); // デバッグ用のログ

  return $.html();
};
