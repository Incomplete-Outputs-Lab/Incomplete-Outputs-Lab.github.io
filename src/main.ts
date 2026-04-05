type PageId =
  | "home"
  | "products"
  | "projects"
  | "research"
  | "members"
  | "partners"
  | "technology"
  | "contact";

const NAV: { id: PageId; href: string; label: string }[] = [
  { id: "home", href: "/index.html", label: "ホーム" },
  { id: "products", href: "/products.html", label: "製品" },
  { id: "projects", href: "/projects.html", label: "プロジェクト" },
  { id: "research", href: "/research.html", label: "研究" },
  { id: "members", href: "/members.html", label: "メンバー" },
  { id: "partners", href: "/partners.html", label: "パートナー" },
  { id: "technology", href: "/technology.html", label: "技術" },
  { id: "contact", href: "/contact.html", label: "お問い合わせ" },
];

function navLinkClass(current: PageId, id: PageId): string {
  const base =
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";
  if (current === id) {
    return `${base} bg-cyan-500/15 text-cyan-300`;
  }
  return `${base} text-zinc-300 hover:bg-zinc-800 hover:text-white`;
}

function buildNavItems(current: PageId): string {
  return NAV.map(
    (item) =>
      `<a href="${item.href}" class="${navLinkClass(current, item.id)}">${item.label}</a>`,
  ).join("");
}

class SiteHeader extends HTMLElement {
  connectedCallback(): void {
    const current = (this.getAttribute("data-current") ?? "home") as PageId;
    this.innerHTML = `
      <header class="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
          <a href="/index.html" class="group flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded-md md:gap-3">
            <img
              src="/logo.png"
              alt=""
              width="512"
              height="512"
              class="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
              decoding="async"
            />
            <span class="flex min-w-0 flex-col">
              <span class="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors">未完成成果物研究所</span>
              <span class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Mikansei Laboratory</span>
            </span>
          </a>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-zinc-700 p-2 text-zinc-200 hover:bg-zinc-800 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            aria-expanded="false"
            aria-controls="site-nav-panel"
            data-nav-toggle
            aria-label="メニューを開く"
          >
            <svg class="h-5 w-5" data-icon-open viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            </svg>
            <svg class="hidden h-5 w-5" data-icon-close viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>
            </svg>
          </button>
          <nav
            id="site-nav-panel"
            class="absolute left-0 right-0 top-full z-40 flex max-md:hidden flex-col gap-1 border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:static md:z-auto md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0"
            data-nav-panel
            aria-label="メインナビゲーション"
          >
            ${buildNavItems(current)}
          </nav>
        </div>
      </header>
      <div class="h-[var(--header-h)] shrink-0" aria-hidden="true" style="--header-h: 4.25rem"></div>
    `;

    const toggle = this.querySelector("[data-nav-toggle]");
    const panel = this.querySelector("[data-nav-panel]");
    const iconOpen = this.querySelector("[data-icon-open]");
    const iconClose = this.querySelector("[data-icon-close]");

    if (!toggle || !panel || !iconOpen || !iconClose) return;

    const setOpen = (open: boolean): void => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      panel.classList.toggle("max-md:hidden", !open);
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setOpen(false);
        }
      });
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <footer class="border-t border-zinc-800 bg-zinc-900/40">
        <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm font-semibold text-white">未完成成果物研究所</p>
            <p class="mt-1 text-xs text-zinc-500">配信プロダクション向けツール・ハードウェアの研究開発コミュニティ</p>
          </div>
          <p class="text-xs text-zinc-500">© ${new Date().getFullYear()} Mikansei Laboratory</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
