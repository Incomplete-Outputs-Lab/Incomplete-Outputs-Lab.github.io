import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

/** Vite がエントリ CSS の link を module スクリプトの後に出すため FOUC になるのを防ぎ、アプリ CSS を先に読み込む。 */
function cssBeforeAppScript(): Plugin {
  return {
    name: "css-before-app-script",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const scriptStart = html.indexOf('<script type="module"');
        if (scriptStart === -1) return html;
        const scriptEnd = html.indexOf("</script>", scriptStart) + "</script>".length;
        const scriptTag = html.slice(scriptStart, scriptEnd);
        if (!scriptTag.includes("/assets/main-")) return html;

        const linkStart = html.indexOf('<link rel="stylesheet"', scriptEnd);
        if (linkStart === -1) return html;
        const linkEnd = html.indexOf(">", linkStart) + 1;
        const linkTag = html.slice(linkStart, linkEnd);
        if (!linkTag.includes("/assets/main-")) return html;
        if (linkStart < scriptStart) return html;

        return (
          html.slice(0, scriptStart) + linkTag + "\n    " + scriptTag + html.slice(linkEnd)
        );
      },
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), cssBeforeAppScript()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        products: resolve(root, "products.html"),
        projects: resolve(root, "projects.html"),
        research: resolve(root, "research.html"),
        members: resolve(root, "members.html"),
        partners: resolve(root, "partners.html"),
        technology: resolve(root, "technology.html"),
        contact: resolve(root, "contact.html"),
      },
    },
  },
});
