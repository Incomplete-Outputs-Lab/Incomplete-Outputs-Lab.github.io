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
  { id: "research", href: "/research.html", label: "リサーチ" },
  { id: "members", href: "/members.html", label: "メンバー" },
  { id: "partners", href: "/partners.html", label: "パートナー" },
  { id: "technology", href: "/technology.html", label: "技術" },
  { id: "contact", href: "/contact.html", label: "お問い合わせ" },
];

const SITE_GITHUB_HREF = "https://github.com/MikanseiLaboratory/MikanseiLaboratory.github.io";
const DISCORD_INVITE_HREF = "https://discord.gg/YUbmg9Hq37";

const ICON_GITHUB = `<svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>`;

const ICON_DISCORD = `<svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
</svg>`;

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

class SocialLinks extends HTMLElement {
  connectedCallback(): void {
    const variant = this.getAttribute("data-variant") ?? "page";
    const ariaLabel = this.getAttribute("aria-label") ?? "GitHub と Discord";
    const linkClass =
      variant === "footer"
        ? "inline-flex items-center gap-2 rounded text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        : "inline-flex items-center gap-2 rounded text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";
    this.innerHTML = `
      <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="${ariaLabel}">
        <a href="${SITE_GITHUB_HREF}" class="${linkClass}" target="_blank" rel="noopener noreferrer">
          ${ICON_GITHUB}
          <span>GitHub</span>
        </a>
        <a href="${DISCORD_INVITE_HREF}" class="${linkClass}" target="_blank" rel="noopener noreferrer">
          ${ICON_DISCORD}
          <span>Discord</span>
        </a>
      </nav>
    `;
  }
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
            <div class="mt-4">
              <social-links data-variant="footer" aria-label="外部リンク"></social-links>
            </div>
          </div>
          <p class="text-xs text-zinc-500">© ${new Date().getFullYear()} Mikansei Laboratory</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("social-links", SocialLinks);
customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
