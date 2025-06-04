import { test, expect } from '@playwright/test';

test.describe('Formularz rejestracyjny', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081');
  });

  async function selectDate20000213(page) {
  const targetDate = new Date('2000-02-13');
  const today = new Date();

  let yearDiff = today.getFullYear() - targetDate.getFullYear();
  let monthDiff = today.getMonth() - targetDate.getMonth();

  if (monthDiff < 0) {
  yearDiff -= 1;
  monthDiff += 12;
  }

  for (let i = 0; i < yearDiff; i++) {
  await page.locator('button.mx-btn-icon-double-left').click();
  }
  for (let i = 0; i < monthDiff; i++) {
  await page.locator('button.mx-btn-icon-left').click();
  }

  await page.locator('td.cell[title="2000-02-13"]').click();
  }

  test('Scenariusz 1: Poprawna rejestracja', async ({ page }) => {
    await page.getByLabel('Imię*').fill('Emanuel');
    await page.getByLabel('Nazwisko*').fill('Woźniak');
    await page.getByLabel('Adres e-mail*').fill('wozniak.emanuel@tests.com');
    await page.locator('input[placeholder="Hasło"]').first().fill('Test12345!');
    await page.locator('input[placeholder="Powtórz hasło"]').fill('Test12345!');
    await page.getByLabel('Data urodzenia*').click();
    await selectDate20000213(page);
    await page.getByLabel('Język').selectOption({ label: 'polski' });
    await page.getByPlaceholder('Numer telefonu').fill('501123456');
    await page.locator('label:has-text("Akceptuję") div.fake-input').click();
    await page.getByRole('button', { name: /zarejestruj/i }).click();

    await expect(page.locator('h1')).toContainText('dziękujemy za rejestrację');
  });

  test('Scenariusz 2: Puste wymagane pola', async ({ page }) => {
    await page.getByRole('button', { name: /zarejestruj/i }).click();

    await expect(page.locator('text=Pole Imię jest wymagane')).toBeVisible();
    await expect(page.locator('text=Pole Nazwisko jest wymagane')).toBeVisible();
    await expect(page.locator('text=Pole E-mail jest wymagane')).toBeVisible();
    await expect(page.locator('text=Pole password jest wymagane')).toBeVisible();
    await expect(page.locator('text=Pole Powtórz hasło jest wymagane')).toBeVisible();
    await expect(page.locator('text=Pole Data urodzenia jest wymagane')).toBeVisible();

    const allWarnings = await page.locator('text=To pole jest wymagane').all();
    await expect(allWarnings[allWarnings.length - 1]).toBeVisible();
  });

  test('Scenariusz 3: Niepoprawny adres e-mail', async ({ page }) => {
    await page.getByLabel('Imię*').fill('Emanuel');
    await page.getByLabel('Nazwisko*').fill('Woźniak');
    await page.getByLabel('Adres e-mail*').fill('ABCD');
    await page.locator('input[placeholder="Hasło"]').first().fill('Test12345!');
    await page.locator('input[placeholder="Powtórz hasło"]').fill('Test12345!');
    await page.getByLabel('Data urodzenia*').click();
    await selectDate20000213(page);
    await page.getByLabel('Język').selectOption({ label: 'polski' });
    await page.getByPlaceholder('Numer telefonu').fill('501123456');
    await page.locator('label:has-text("Akceptuję") div.fake-input').click();
    await page.getByRole('button', { name: /zarejestruj/i }).click();

    await expect(page.locator('text=Pole E-mail musi być poprawnym adresem email')).toBeVisible();
  });

  test('Scenariusz 4: Hasła nie są zgodne', async ({ page }) => {
    await page.getByLabel('Imię*').fill('Emanuel');
    await page.getByLabel('Nazwisko*').fill('Woźniak');
    await page.getByLabel('Adres e-mail*').fill('wozniak.emanuel@tests.com');
    await page.locator('input[placeholder="Hasło"]').first().fill('Test12345!');
    await page.locator('input[placeholder="Powtórz hasło"]').fill('Test1234');
    await page.getByLabel('Data urodzenia*').click();
    await selectDate20000213(page);
    await page.getByLabel('Język').selectOption({ label: 'polski' });
    await page.getByPlaceholder('Numer telefonu').fill('501123456');
    await page.locator('label:has-text("Akceptuję") div.fake-input').click();
    await page.getByRole('button', { name: /zarejestruj/i }).click();

    await expect(page.locator('text=Hasła nie są jednakowe!')).toBeVisible();
  });

  test('Scenariusz 5: Brak akceptacji regulaminu', async ({ page }) => {
    await page.getByLabel('Imię*').fill('Emanuel');
    await page.getByLabel('Nazwisko*').fill('Woźniak');
    await page.getByLabel('Adres e-mail*').fill('wozniak.emanuel@tests.com');
    await page.locator('input[placeholder="Hasło"]').first().fill('Test12345!');
    await page.locator('input[placeholder="Powtórz hasło"]').fill('Test12345!');
    await page.getByLabel('Data urodzenia*').click();
    await selectDate20000213(page);
    await page.getByLabel('Język').selectOption({ label: 'polski' });
    await page.getByPlaceholder('Numer telefonu').fill('501123456');
    await page.getByRole('button', { name: /zarejestruj/i }).click();

    await expect(page.locator('text=To pole jest wymagane')).toBeVisible();
  });

});
