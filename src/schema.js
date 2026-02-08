import { gql } from "graphql-tag";

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: Department!
    salary: Int!
  }

  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
  }

  type Mutation {
  addEmployee(
    name: String!
    position: String!
    department: String!
    salary: Int!
  ): Employee!

  deleteEmployeeById(id: ID!): Boolean!
}

`;

export default typeDefs;
