import { ObjectId } from "mongodb";
import { connectDB } from "./db.js";

export const resolvers = {
  Query: {
    // ✅ GET ALL EMPLOYEES
    getAllEmployees: async () => {
      const db = await connectDB();

      return db
        .collection("employees")
        .find({})
        .toArray();
    },

    // ✅ GET SINGLE EMPLOYEE
    getEmployeeDetails: async (_, { id }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID");

      const db = await connectDB();
      return db.collection("employees").findOne({ _id: new ObjectId(id) });
    },

    // ✅ FILTER BY DEPARTMENT
    getEmployeesByDepartment: async (_, { department }) => {
      const db = await connectDB();

      return db
        .collection("employees")
        .find({ department })
        .toArray();
    },

    // 🔍 SEARCH
    // searchEmployees: async (_, { keyword }) => {
    //   const db = await connectDB();

    //   return db
    //     .collection("employees")
    //     .find({
    //       $or: [
    //         { name: { $regex: keyword, $options: "i" } },
    //         { position: { $regex: keyword, $options: "i" } },
    //         { department: { $regex: keyword, $options: "i" } },
    //       ],
    //     })
    //     .toArray();
    // },
  },

  Mutation: {
    // ✅ ADD EMPLOYEE (SAFE INSERT)
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = await connectDB();

      const newEmployee = {
        name,
        position,
        department: department || "General", // fallback
        salary,
      };

      const result = await db.collection("employees").insertOne(newEmployee);

      return {
        _id: result.insertedId,
        ...newEmployee,
      };
    },

    // 🗑 DELETE EMPLOYEE
    deleteEmployee: async (_, { id }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID");

      const db = await connectDB();

      const employee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });

      if (!employee) throw new Error("Employee not found");

      await db.collection("employees").deleteOne({
        _id: new ObjectId(id),
      });

      return employee; // return full deleted employee
    },
  },

  // ✅ MAP Mongo _id → GraphQL id
  Employee: {
    id: (parent) => parent._id?.toString() || parent.id,
  },
};
