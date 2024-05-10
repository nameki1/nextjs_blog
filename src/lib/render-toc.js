import * as cheerio from "cheerio";

export const renderToc = (html) => {
  const $ = cheerio.load(html);
  const headings = $("h2, h3").toArray();
  const toc = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
  }));

  console.log(toc);
  return toc;
};
