import { test, expect } from "@playwright/test";
import { generateValidEnquiry, generateInvalidEmail, generateInvalidPhone } from "./helpers";

test.describe("Contact Page (/contact)", () => {
  test("shows validation error when submitting empty form", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("form").dispatchEvent("submit");
    await expect(page.locator("text=Please fill all required fields")).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    const data = generateInvalidEmail();
    await page.goto("/contact");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="enquiry_type"]', data.enquiryType);
    await page.locator("form").dispatchEvent("submit");
    await expect(page.locator("text=Enter valid email")).toBeVisible();
  });

  test("shows validation error for phone with fewer than 10 digits", async ({ page }) => {
    const data = generateInvalidPhone();
    await page.goto("/contact");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="enquiry_type"]', data.enquiryType);
    await page.locator("form").dispatchEvent("submit");
    await expect(page.locator("text=Phone number must be exactly 10 digits")).toBeVisible();
  });

  test("successfully submits valid enquiry form", async ({ page }) => {
    const data = generateValidEnquiry();
    await page.goto("/contact");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="enquiry_type"]', data.enquiryType);
    await page.fill('textarea[name="message"]', data.message);
    await page.click('button:has-text("Submit Enquiry")');

    await expect(page.locator("text=Thank you for your enquiry!")).toBeVisible();
    await expect(page.locator("text=Our team will get back to you shortly.")).toBeVisible();
  });

  test("form resets after successful submission", async ({ page }) => {
    const data = generateValidEnquiry();
    await page.goto("/contact");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="enquiry_type"]', data.enquiryType);
    await page.click('button:has-text("Submit Enquiry")');

    await expect(page.locator("text=Thank you for your enquiry!")).toBeVisible();

    await page.click('button:has-text("Close")');

    await expect(page.locator('input[name="first_name"]')).toHaveValue("");
    await expect(page.locator('input[name="last_name"]')).toHaveValue("");
    await expect(page.locator('input[name="email"]')).toHaveValue("");
    await expect(page.locator('input[name="phone"]')).toHaveValue("");
    await expect(page.locator('select[name="enquiry_type"]')).toHaveValue("");
  });
});
