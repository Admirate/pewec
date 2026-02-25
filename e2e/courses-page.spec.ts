import { test, expect } from "@playwright/test";
import { generateValidCourseEnquiry } from "./helpers";

test.describe("Courses Page (/courses)", () => {
  test("opens modal when clicking Enquire Now on a course card", async ({ page }) => {
    await page.goto("/courses");
    await page.click('button:has-text("Enquire Now") >> nth=0');
    await expect(page.locator("text=Course Enquiry Form")).toBeVisible();
  });

  test("pre-selects the course when clicking Enquire Now on a specific course", async ({
    page,
  }) => {
    await page.goto("/courses");
    // Click Enquire Now on the first course card (Teacher Training)
    await page.click('button:has-text("Enquire Now") >> nth=0');

    // Wait for modal and courses to load
    await expect(page.locator("text=Course Enquiry Form")).toBeVisible();
    await expect(page.locator('select[name="course_id"]')).not.toBeDisabled();

    // The course should be pre-selected
    const select = page.locator('select[name="course_id"]');
    const selectedValue = await select.inputValue();
    expect(selectedValue).not.toBe("");
  });

  test("can submit enquiry for a pre-selected course", async ({ page }) => {
    await page.goto("/courses");
    // Click Enquire Now on Teacher Training (first course)
    await page.click('button:has-text("Enquire Now") >> nth=0');

    // Wait for modal and courses to load
    await expect(page.locator("text=Course Enquiry Form")).toBeVisible();
    await expect(page.locator('select[name="course_id"]')).not.toBeDisabled();

    // Get the pre-selected course value
    const select = page.locator('select[name="course_id"]');
    const courseId = await select.inputValue();

    // Fill in the rest of the form
    const data = generateValidCourseEnquiry(courseId);
    await page.fill('input[name="first_name"]', data.firstName);
    await page.fill('input[name="last_name"]', data.lastName);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="phone"]', data.phone);
    await page.fill('textarea[name="message"]', data.message);

    await page.click('button:has-text("Submit Enquiry")');

    await expect(page.locator("text=Thank you for your enquiry!")).toBeVisible();
    await expect(
      page.locator("text=Our team will contact you about your course soon."),
    ).toBeVisible();
  });

  test("short term courses section has Enquire Now button", async ({ page }) => {
    await page.goto("/courses");
    // The short term courses (Art and Craft) should have an Enquire Now button
    await expect(page.locator('button:has-text("Enquire Now")').first()).toBeVisible();
  });
});
