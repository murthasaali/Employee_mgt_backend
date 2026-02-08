import { connectDB } from "./db.js";

async function seed() {
  const db = await connectDB();

  await db.collection("employees").deleteMany({});

  await db.collection("employees").insertMany([
    { name: "Ameen", position: "Developer", department: "IT", salary: 50000 },
    { name: "Rahul", position: "Designer", department: "Design", salary: 45000 },
    { name: "Sara", position: "HR Manager", department: "HR", salary: 48000 },
    { name: "John", position: "Backend Dev", department: "IT", salary: 60000 },
    { name: "Priya", position: "Recruiter", department: "HR", salary: 42000 },
  ]);

  console.log("✅ Local DB Seeded");
  process.exit();
}

seed();
