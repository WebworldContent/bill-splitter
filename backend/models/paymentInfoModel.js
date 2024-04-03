// import { ObjectId } from "mongodb";
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

// export const getPaymentInfo = async (groupId) => {
//   try {
//     return await execute(async (client) => {
//       const db = client.db("billSplitter");
//       const collection = db.collection("paymentDetails");
//       const groupObjectId = new ObjectId(groupId);
//       return await collection.find({_id: groupObjectId}).toArray();
//     });
//   } catch (error) {
//     throw new Error(`Encounter error while querying: ${error}`);
//   }
// };
