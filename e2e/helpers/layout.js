export async function documentOverflowPx(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

export async function boxFitsViewport(locator, tolerance = 4) {
  return locator.evaluate((el, slack) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      width: rect.width,
      viewport: window.innerWidth,
      fits: rect.left >= -slack && rect.right <= window.innerWidth + slack,
    };
  }, tolerance);
}

export async function overflowsOwnBox(locator) {
  return locator.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
}
