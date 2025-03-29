import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();
const uuid = Array.from({ length: 20 });
async function insertData() {
  const data = {
    name: faker.person.fullName,
  };
}
