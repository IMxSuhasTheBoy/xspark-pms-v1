import { User } from "./../../client/src/state/api";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  const deletionOrder = [
    "ProjectTeam", // Delete dependent records first
    "TaskAssignment",
    "Comment",
    "Attachment",
    "Task",
    "Project",
    "User",
    "Team",
  ];

  // await deleteAllData(deletionOrder);

  // for (const fileName of orderedFileNames) {
  const filePath = path.join(dataDirectory, "taskAssignment.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const modelName = path.basename(filePath, path.extname(filePath));
  const model: any = prisma[modelName as keyof typeof prisma];

  try {
    for (const data of jsonData) {
      await model.create({ data });
      console.log(`Seeded ${modelName} with data from ${filePath}`);
    }
  } catch (error) {
    console.error(`Error seeding data for ${modelName}:`, error);
  }
}
// }

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

//   The SQL query you provided is used in PostgreSQL to set the value of a serial sequence associated with the `id` column of the `Project` table. Let's break it down step by step:

//SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";

// ### Breakdown of the Query

// 1. **`pg_get_serial_sequence('Project', 'id')`**:
//    - This function retrieves the name of the sequence that is associated with the `id` column of the `Project` table. In PostgreSQL, when you define a column as a `SERIAL`, a sequence is automatically created to generate unique values for that column.

// 2. **`max(id)`**:
//    - This part of the query calculates the maximum value currently present in the `id` column of the `Project` table. The `max()` function is an aggregate function that returns the highest value in a set of values.

// 3. **`coalesce(max(id)+1, 1)`**:
//    - The `coalesce()` function is used to handle potential `NULL` values. If the `max(id)` returns `NULL` (which would happen if the `Project` table is empty), `coalesce()` will return `1`. If there are existing IDs, it will return the maximum ID plus one. This ensures that the next value generated by the sequence will be unique and greater than any existing ID.

// 4. **`setval(...)`**:
//    - The `setval()` function is used to set the current value of the specified sequence. The first argument is the sequence name (obtained from `pg_get_serial_sequence`), and the second argument is the value to set the sequence to (the result of `coalesce(max(id)+1, 1)`). The third argument (`false`) indicates that the next call to `nextval()` on this sequence will return the value set by `setval()`.

// 5. **`FROM "Project"`**:
//    - This specifies the table from which the maximum `id` is being calculated. The query is effectively looking at the `Project` table to determine the highest current ID.

// ### Purpose of the Query

// The primary purpose of this query is to ensure that the sequence used for generating new IDs in the `Project` table is correctly synchronized with the existing IDs. This is particularly important in scenarios where records may have been deleted, or if the table is being populated from an external source, to avoid conflicts or duplicate keys.

// ### Learning Perspective

// From a learning perspective, this query illustrates several important concepts in SQL and PostgreSQL:

// - **Sequences**: Understanding how sequences work in PostgreSQL, especially in relation to `SERIAL` columns.
// - **Aggregate Functions**: Learning how to use aggregate functions like `max()` to derive values from a set of data.
// - **Handling NULLs**: Using `coalesce()` to manage potential `NULL` values effectively.
// - **Setting Sequence Values**: Knowing how to manipulate sequence values with `setval()` to maintain data integrity.

// This query is a good example of how to manage primary keys in a relational database, ensuring that each new entry has a unique identifier, which is crucial for maintaining relationships between tables and ensuring data integrity.
