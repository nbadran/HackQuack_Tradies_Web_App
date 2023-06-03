const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const tree_removal = await prisma.service_type.upsert({
    where: { id: 1 },
    update: {},
    create: {
      service_type_name: "Tree removal",
    },
  });

  const roof_cleaning = await prisma.service_type.upsert({
    where: { id: 2 },
    update: {},
    create: {
      service_type_name: "Roof cleaning",
    },
  });

  const fence_installation = await prisma.service_type.upsert({
    where: { id: 3 },
    update: {},
    create: {
      service_type_name: "Fence installation",
    },
  });

  const oven_repairs = await prisma.service_type.upsert({
    where: { id: 4 },
    update: {},
    create: {
      service_type_name: "Oven repairs",
    },
  });

  const plumber = await prisma.service_type.upsert({
    where: { id: 5 },
    update: {},
    create: {
      service_type_name: "Plumber",
    },
  });

  async function seedClient() {
    for (let i = 0; i < 50; i++) {
      const user = {
        first_name: `customer ${i + 1}`,
        last_name: `customer ${i + 1}`,
        email: `customer${i + 1}@mail.com`,
        phone: "1234",
        password: "1234",
        suburb: `Address${i + 1}`,
        address: `Keiraville`,
        state: `NSW`,
        postcode: `2500`,
        card_number: `${i + 1}`,
        card_security_num: `${i + 1}`,
        card_expiry_date: new Date("2022-03-25"),
      };

      await prisma.client.create({ data: user });
    }
  }

  await seedClient();

  async function seedProfessional() {
    for (let i = 0; i < 50; i++) {
      const user = {
        first_name: `professional ${i + 1}`,
        last_name: `professional ${i + 1}`,
        email: `professional ${i + 1}`,
        abn: `ABN ${i + 1}`,
        password: `1234`,
        address: `address ${i + 1}`,
        suburb: `Keiraville ${i + 1}`,
        tfn: `TFN${i + 1}`,
        state: `NSW`,
        postcode: `250${i + 1}`,
        card_number: `Card Num ${i + 1}`,
        card_security_num: `professional ${i + 1}`,
        card_expiry_date: new Date("2022-03-25"),
        service_type_id: 1,
      };

      await prisma.professional.create({ data: user });
    }
  }

  await seedProfessional();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
