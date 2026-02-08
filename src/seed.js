import { connectDB } from "./db.js";

async function seed() {
  const db = await connectDB();

  await db.collection("employees").deleteMany({});
  await db.collection("departments").deleteMany({});

  const departments = [
    { name: "Engineering", floor: 3 },
    { name: "HR", floor: 1 },
    { name: "Finance", floor: 2 },
  ];

  const deptResult = await db
    .collection("departments")
    .insertMany(departments);

  const deptMap = Object.values(deptResult.insertedIds);

  const employees = [
    {
      name: "Arjun",
      position: "Frontend Dev",
      salary: 60000,
      department: {
        id: deptMap[0].toString(),
        name: "Engineering",
        floor: 3,
      },
    },
    {
      name: "Rahul",
      position: "Backend Dev",
      salary: 65000,
      department: {
        id: deptMap[0].toString(),
        name: "Engineering",
        floor: 3,
      },
    },
    {
      name: "Sneha",
      position: "HR Manager",
      salary: 50000,
      department: {
        id: deptMap[1].toString(),
        name: "HR",
        floor: 1,
      },
    },
    {
      name: "Anjali",
      position: "Accountant",
      salary: 55000,
      department: {
        id: deptMap[2].toString(),
        name: "Finance",
        floor: 2,
      },
    },
    {
      name: "Vikram",
      position: "Finance Analyst",
      salary: 58000,
      department: {
        id: deptMap[2].toString(),
        name: "Finance",
        floor: 2,
      },
    },
  ];

  await db.collection("employees").insertMany(employees);

  console.log("✅ Database seeded successfully");
  process.exit();
}

seed();
