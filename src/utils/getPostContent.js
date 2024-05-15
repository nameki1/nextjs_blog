import { notion } from "@/lib/notion";
const { NotionToMarkdown } = require("notion-to-md");

const n2m = new NotionToMarkdown({ notionClient: notion });

// notionのcodeブロックにファイル名とdiffの構成を追加
n2m.setCustomTransformer("code", (block) => {
  const { code } = block;
  const language = code.language === "text" ? "plain text" : code.language;
  const fileName = code.caption.map((item) => item.plain_text).join("");
  const codeString = code.rich_text.map((item) => item.plain_text).join("");

  if (language === "diff") {
    return `\`\`\`${language} ${fileName || "text"}
${codeString}
\`\`\``;
  }

  if (language === "plain text" && fileName) {
    return `\`\`\`${fileName}
${codeString}
\`\`\``;
  }

  return `\`\`\`${language}${fileName ? `:${fileName}` : ""}
${codeString}
\`\`\``;
});

// embed
// https://zenn.dev/zenn/articles/markdown-guide#%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%81%AE%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF
n2m.setCustomTransformer("embed", (block) => {
  const { embed } = block;
  if (!embed.url) return "";

  return `
${embed.url}
`;
});

export async function getPostContent(pageId) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  const mdStrings = n2m.toMarkdownString(mdblocks);

  return mdStrings;
}
