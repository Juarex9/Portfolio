const CODE_SNIPPETS = {
  "gestion-turnos": [
    "const Appointment = { status, slot, clientId };",
    "router.post('/api/turnos', auth, createTurno);",
    "await db.collection('appointments').insertOne(payload);",
    "socket.emit('calendar:update', { date, slots });",
    "return res.status(201).json({ ok: true, id });",
  ],
  "scraper-precios": [
    "async def scrape_prices(url: str) -> list[Price]:",
    "    soup = BeautifulSoup(html, 'lxml')",
    "    rows = parse_supermarket_grid(soup)",
    "    await db.execute(insert_prices, rows)",
    "    return normalize(rows)",
  ],
  "ink-ai-risk-detector": [
    "export async function scanContract(address) {",
    "  const bytecode = await provider.getCode(address);",
    "  const signals = await model.analyze(bytecode);",
    "  return { score: riskScore(signals), flags };",
    "}",
  ],
};

function buildCodeOverlay(projectKey, title, tech) {
  const lines = CODE_SNIPPETS[projectKey] || [
    `// ${title}`,
    `const stack = ${JSON.stringify(tech)};`,
    "export async function build() {",
    "  return deploy({ env: 'production' });",
    "}",
  ];

  const body = lines.flatMap((line) => [line, ...tech.slice(0, 2).map((item) => `// ${item}`)]).join("\n");
  return `${body}\n${body}\n${body}`;
}

export function getProjectCodeOverlay(projectKey, title, tech) {
  return buildCodeOverlay(projectKey, title, Array.isArray(tech) ? tech : []);
}

export function computeScannerClip(cardRect, scannerX, scannerWidth = 10) {
  const scannerLeft = scannerX - scannerWidth / 2;
  const scannerRight = scannerX + scannerWidth / 2;
  const cardLeft = cardRect.left;
  const cardRight = cardRect.right;
  const cardWidth = cardRect.width;

  if (cardWidth <= 0) {
    return { clipRight: 0, clipLeft: 0, scanning: false };
  }

  if (cardRight <= scannerLeft) {
    return { clipRight: 100, clipLeft: 100, scanning: false };
  }

  if (cardLeft >= scannerRight) {
    return { clipRight: 0, clipLeft: 0, scanning: false };
  }

  const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
  const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

  return {
    clipRight: (scannerIntersectLeft / cardWidth) * 100,
    clipLeft: (scannerIntersectRight / cardWidth) * 100,
    scanning: true,
  };
}

export const STREAM_CARD_WIDTH = 320;
export const STREAM_CARD_GAP = 40;

export function getStreamCardStep(cardWidth, cardGap = STREAM_CARD_GAP) {
  return cardWidth + cardGap;
}
