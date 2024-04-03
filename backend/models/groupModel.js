import { ObjectId } from "mongodb";
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

export const updateData = async (data, groupId) => {
  try {
    console.log(data, groupId);
    return await execute(async (client) => {
      const db = client.db("billSplitter");
      const collection = db.collection("group");
      const groupObjectId = new ObjectId(groupId);
      const expenseObjectId = new ObjectId(data);
      const group = await collection.findOne({ _id: groupObjectId });

      if (!group.expenses) {
        await collection.updateOne(
          { _id: groupObjectId },
          { $set: { expenses: [] } }
        );
      }
      

      return await collection.updateOne(
        { _id: groupObjectId },
        { $push: { expenses: expenseObjectId } }
      );

    });
  } catch (error) {
    throw new Error(`Encounter error while querying: ${error}`);
  }
};

export const getData = async (groupId) => {
  try {
    return await execute(async (client) => {
      const db = client.db("billSplitter");
      const collection = db.collection("group");
      const groupObjectId = new ObjectId(groupId);
      return await collection.findOne({ _id: groupObjectId });
    });
  } catch (error) {
    throw new Error(`Encounter error while querying: ${error}`);
  }
};
