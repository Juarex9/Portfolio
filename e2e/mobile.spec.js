import { expect, test } from "@playwright/test";
import { boxFitsViewport, documentOverflowPx, overflowsOwnBox } from "./helpers/layout.js";

const ROUTES = ["/", "/proyectos", "/educacion", "/sobremi", "/contacto"];

async function gotoSettled(page, path) {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.locator("header").waitFor();
}

test.describe("portfolio en celular", () => {
  test("home no genera scroll horizontal", async ({ page }) => {
    await gotoSettled(page, "/");
    expect(await documentOverflowPx(page)).toBeLessThanOrEqual(1);
  });

  test("el chip de idioma muestra ES o EN y no se recorta", async ({ page }) => {
    await gotoSettled(page, "/");
    const langBtn = page.getByRole("button", { name: "Change language" });

    await expect(langBtn).toBeVisible();
    await expect(langBtn).toHaveText(/^(ES|EN)$/);
    expect(await overflowsOwnBox(langBtn)).toBe(false);
    expect((await boxFitsViewport(langBtn)).fits).toBe(true);
  });

  test("el menú hamburguesa abre y navega", async ({ page }) => {
    await gotoSettled(page, "/");

    await page.getByRole("button", { name: "Toggle navigation" }).click();
    const proyectos = page.locator("header").getByRole("link", { name: "Proyectos" });
    await expect(proyectos).toBeVisible();
    await proyectos.click();
    await expect(page).toHaveURL(/\/proyectos$/);
    expect(await documentOverflowPx(page)).toBeLessThanOrEqual(1);
  });

  test("hero y CTAs quedan dentro del viewport", async ({ page }) => {
    await gotoSettled(page, "/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    expect((await boxFitsViewport(heading)).fits).toBe(true);

    const contactCta = page.locator("main").getByRole("link", { name: "Contacto" });
    const projectsCta = page.locator("main").getByRole("link", { name: /Ver Proyectos|View Projects/i });
    expect((await boxFitsViewport(contactCta)).fits).toBe(true);
    expect((await boxFitsViewport(projectsCta)).fits).toBe(true);
  });

  test("proyectos destacados usan cards usables, no la galería WebGL", async ({ page }) => {
    await gotoSettled(page, "/");

    await expect(page.locator("main canvas")).toHaveCount(0);
    const cards = page.locator("main article");
    await cards.first().scrollIntoViewIfNeeded();
    await expect(cards.first()).toBeVisible();
    expect((await boxFitsViewport(cards.first())).fits).toBe(true);
  });

  test("sobre mí muestra una card de experiencia que entra en pantalla", async ({ page }) => {
    await gotoSettled(page, "/sobremi");

    const card = page.locator("article").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    const box = await boxFitsViewport(card);
    expect(box.fits).toBe(true);
    expect(box.width).toBeLessThanOrEqual(box.viewport);
  });

  test("contacto mantiene el mail y el formulario dentro de la pantalla", async ({ page }) => {
    await gotoSettled(page, "/contacto");

    const email = page.getByRole("link", { name: /agustinjuarez375@gmail.com/i });
    await expect(email).toBeVisible();
    expect((await boxFitsViewport(email)).fits).toBe(true);

    const nameInput = page.getByLabel(/tu nombre|your name/i);
    const message = page.getByLabel(/mensaje|message/i);
    expect((await boxFitsViewport(nameInput)).fits).toBe(true);
    expect((await boxFitsViewport(message)).fits).toBe(true);
  });

  for (const route of ROUTES) {
    test(`${route} no desborda el ancho del celular`, async ({ page }) => {
      await gotoSettled(page, route);
      expect(await documentOverflowPx(page)).toBeLessThanOrEqual(1);
    });
  }
});
