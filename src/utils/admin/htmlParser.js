import { remark } from "remark";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeStringify from "rehype-stringify";

export function htmlToMarkdown(htmlText) {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}

export function markdownToHtml(markdownText) {
  const file = remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdownText);

  return String(file);
}
