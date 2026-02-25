import { test, expect } from "@playwright/test";
import { generateValidCourseEnquiry, generateInvalidEmail, generateInvalidPhone } from "./helpers";

test.describe("Homepage Forms", () => {
  test("opens modal when clicking Enquire Now on homepage", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');
    await expect(page.locator("text=Course Enquiry Form")).toBeVisible();
  });

  test("course dropdown has optgroups for Long Term and Short Term courses", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');

    const select = page.locator('select[name="course_id"]');
    await expect(select).toBeVisible();

    await expect(
      page.locator('select[name="course_id"] optgroup[label="Long Term Courses"]'),
    ).toBeAttached();
    await expect(
      page.locator('select[name="course_id"] optgroup[label="Short Term Courses"]'),
    ).toBeAttached();
  });

  test("shows validation error when submitting empty form", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');
    await page.click('button:has-text("Submit Enquiry")');
    await expect(page.locator("text=Please fill all required fields")).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    const data = generateInvalidEmail();
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');

    // Wait for courses to load
    await expect(
      page.locator('select[name="course_id"] optgroup[label="Long Term Courses"]'),
    ).toBeAttached();

    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="course_id"]', { index: 1 });

    await page.locator("form").dispatchEvent("submit");
    await expect(page.locator("text=Enter valid email")).toBeVisible();
  });

  test("shows validation error for phone with fewer than 10 digits", async ({ page }) => {
    const data = generateInvalidPhone();
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');

    // Wait for courses to load
    await expect(
      page.locator('select[name="course_id"] optgroup[label="Long Term Courses"]'),
    ).toBeAttached();

    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="course_id"]', { index: 1 });

    await page.locator("form").dispatchEvent("submit");
    await expect(page.locator("text=Phone number must be exactly 10 digits")).toBeVisible();
  });

  test("successfully submits valid course enquiry form", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');

    // Wait for courses to load - check that the select is enabled (not loading)
    await expect(page.locator('select[name="course_id"]')).not.toBeDisabled();

    const data = generateValidCourseEnquiry("teacher-training");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="course_id"]', { index: 1 });
    await page.fill('textarea[name="message"]', data.message);

    await page.click('button:has-text("Submit Enquiry")');

    await expect(page.locator("text=Thank you for your enquiry!")).toBeVisible();
    await expect(
      page.locator("text=Our team will contact you about your course soon."),
    ).toBeVisible();
  });

  test("form resets after successful submission", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Enquire Now")');

    // Wait for courses to load
    await expect(page.locator('select[name="course_id"]')).not.toBeDisabled();

    const data = generateValidCourseEnquiry("teacher-training");
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.selectOption('select[name="course_id"]', { index: 1 });

    await page.click('button:has-text("Submit Enquiry")');

    await expect(page.locator("text=Thank you for your enquiry!")).toBeVisible();

    await page.click('button:has-text("Close")');

    await page.click('button:has-text("Enquire Now")');

    await expect(page.locator('input[name="first_name"]')).toHaveValue("");
    await expect(page.locator('input[name="last_name"]')).toHaveValue("");
    await expect(page.locator('input[name="email"]')).toHaveValue("");
    await expect(page.locator('input[name="phone"]')).toHaveValue("");
  });
});
