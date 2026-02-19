import { visit } from "unist-util-visit";

/**
 * Remark plugin that converts ```mermaid code blocks into
 * raw HTML divs BEFORE rehype-pretty-code processes them.
 */
export function remarkMermaid() {
  return (tree: any) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (node.lang !== "mermaid" || index === undefined) return;

      const escaped = node.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      parent.children[index] = {
        type: "html",
        value: `<div data-mermaid-chart>${escaped}</div>`,
      };
    });
  };
}
