import { faker } from "@faker-js/faker";

export function generateValidEnquiry() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet
      .email({ firstName: faker.person.firstName() })
      .toLowerCase(),
    phone: faker.string.numeric(10),
    enquiryType: "general",
    message: faker.lorem.sentence(),
  };
}

export function generateValidCourseEnquiry(courseId: string) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.string.numeric(10),
    courseId,
    message: faker.lorem.sentence(),
  };
}

export function generateInvalidEmail() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.lorem.word() + "@",
    phone: faker.string.numeric(10),
    enquiryType: "general",
  };
}

export function generateInvalidPhone() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.string.numeric(5),
    enquiryType: "general",
  };
}
