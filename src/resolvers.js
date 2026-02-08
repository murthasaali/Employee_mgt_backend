import { ObjectId } from "mongodb";
import { connectDB } from "./db.js";

const resolvers = {
  Query: {
   getAllEmployees: async () => {
  const db = await connectDB();
  const employees = await db.collection("employees").find().toArray();
  console.log("EMPLOYEES FROM DB:", employees);
  return employees;
},


    getEmployeeDetails: async (_, { id }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID");

      const db = await connectDB();
      return db.collection("employees").findOne({
        _id: new ObjectId(id),
      });
    },

    getEmployeesByDepartment: async (_, { department }) => {
      const db = await connectDB();
      return db
        .collection("employees")
        .find({ "department.name": department })
        .toArray();
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = await connectDB();

      const dept = await db
        .collection("departments")
        .findOne({ name: department });

      if (!dept) throw new Error("Department not found");

      const newEmployee = {
        name,
        position,
        salary,
        department: {
          id: dept._id.toString(),
          name: dept.name,
          floor: dept.floor,
        },
      };

      const result = await db
        .collection("employees")
        .insertOne(newEmployee);

      return {
        id: result.insertedId.toString(),
        ...newEmployee,
      };
    },

    // ✅ DELETE MUTATION (correct place)
    deleteEmployeeById: async (_, { id }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID");

      const db = await connectDB();
      const result = await db.collection("employees").deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        throw new Error("Employee not found");
      }

      return true;
    },
  },

  Employee: {
    id: (parent) => parent._id?.toString(),
  },

  Department: {
    id: (parent) => parent.id || parent._id?.toString(),
  },
};

export default resolvers;
