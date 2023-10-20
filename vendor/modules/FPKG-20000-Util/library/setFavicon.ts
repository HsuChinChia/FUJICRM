/** 設定左上角icon */
export default (favicon?: string) => {
  if (favicon) setFavicon(favicon);
};

interface IconHTMLElement extends HTMLElement {
  rel: string;
  href: string;
  type: string;
}

/** 設定左上小圖 */
function setFavicon(file: string | undefined) {
  if (!file) return;
  const img = file;

  const link: IconHTMLElement =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");

  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = img;
  const head = document.querySelector("head");
  if (head && checkExist()) {
    head.appendChild(link);
  }

  /** 檢查是否有同樣的標籤存在 */
  function checkExist() {
    const target = document.querySelector("link[rel*='icon']");
    if (target) {
      const content = target.getAttribute("href");
      return content !== img;
    }
    return true;
  }
}
