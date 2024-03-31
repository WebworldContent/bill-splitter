import { execute } from "../config/db.js";

export const addData = async (data) => {
  try {
    return await execute(async (client) => {
      const db = client.db("billSplitter");
      const collection = db.collection("group");
      return await collection.insertOne(data);
    });
  } catch (error) {
    throw new Error(`Encounter error while querying: ${error}`);
  }
};
