import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateUUIDs = (count: number): string[] => {
  return Array.from({ length: count }).map(() => faker.string.uuid());
};

async function insertData() {
  const uuidProduct = generateUUIDs(20);
  const product = uuidProduct.map((productId) => ({
    id: productId,
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
    stock: faker.number.int({ min: 5, max: 100 }),
  }));

  await prisma.products.createMany({ data: product });
  console.log("seed product successful");

  const uuidUser = generateUUIDs(10);
  const user = uuidUser.map((userId) => ({
    id: userId,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  await prisma.users.createMany({ data: user });

  const uuidOrder = generateUUIDs(100);
  const order = uuidOrder.map((orderId) => ({
    id: orderId,
    user_id: user[faker.number.int({ min: 0, max: 9 })].id,
    product_id: product[faker.number.int({ min: 0, max: 9 })].id,
    quantity: faker.number.int({ min: 1, max: 5 }),
  }));

  await prisma.orders.createMany({ data: order });
  console.log("User inserted:");
}

insertData()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => prisma.$disconnect());
