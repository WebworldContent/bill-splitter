import { ObjectId } from "mongodb";
import { execute } from "../config/db.js";

export const addPaymentInfo = async (data) => {
  try {
    return await execute(async (client) => {
      const db = client.db("billSplitter");
      const collection = db.collection("paymentDetails");
      return await collection.insertOne(data);
    });
  } catch (error) {
    throw new Error(`Encounter error while querying: ${error}`);
  }
};

export const getPaymentInfo = async (groupId) => {
  try {
    return await execute(async (client) => {
      const db = client.db("billSplitter");
      const collection = db.collection("group");
      const groupObjectId = new ObjectId(groupId);

      const result = await await collection.aggregate([
        {
          $match: {
            _id: groupObjectId
          }
        },
        {
          $lookup: {
            from: "paymentDetails",
            localField: "expenses",
            foreignField: "_id",
            as: "expenses"
          }
        }
      ]).toArray();

      return result;
    });
  } catch (error) {
    throw new Error(`Encounter error while querying: ${error}`);
  }
};
