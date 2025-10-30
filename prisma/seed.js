const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.orders.deleteMany({});
  await prisma.carts.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.users.deleteMany({});

  const products = await Promise.all([
    prisma.products.create({
      data: {
        name: 'Laptop',
        price: 15000000
      }
    }),
    prisma.products.create({
      data: {
        name: 'Smartphone',
        price: 8000000
      }
    }),
    prisma.products.create({
      data: {
        name: 'Headphones',
        price: 400000
      }
    }),
    prisma.products.create({
      data: {
        name: 'Monitor',
        price: 3000000
      }
    })
  ]);

  console.log('Created products:', products);

  const users = await Promise.all([
    prisma.users.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    }),
    prisma.users.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    }),
    prisma.users.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob@example.com'
      }
    })
  ]);

  console.log('Created users:', users);

  const orders = await Promise.all([
    prisma.orders.create({
      data: {
        user_id: users[0].id,
        total: 1500000,
        status: 'not_finish'
      }
    }),
    prisma.orders.create({
      data: {
        user_id: users[0].id,
        total: 2000000,
        status: 'not_finish'
      }
    }),
    prisma.orders.create({
      data: {
        user_id: users[1].id,
        total: 1200000,
        status: 'not_finish'
      }
    }),
    prisma.orders.create({
      data: {
        user_id: users[2].id,
        total: 400000,
        status: 'not_finish'
      }
    }),
    prisma.orders.create({
      data: {
        user_id: users[2].id,
        total: 300000,
        status: 'not_finish'
      }
    })
  ]);

  console.log('Created orders:', orders);

  const carts = await Promise.all([
    prisma.carts.create({
      data: {
        product_id: products[0].id,
        quantity: 1
      }
    }),
    prisma.carts.create({
      data: {
        product_id: products[1].id,
        quantity: 2
      }
    })
  ]);

  console.log('Created carts:', carts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
