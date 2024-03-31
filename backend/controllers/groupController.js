import { addData, getData } from "../models/groupModel.js";

export const addGroup = async (req, res) => {
  const data = { ...req.body };
  try {
    const response = await addData(data);
    const { insertedId } = response;
    console.log(response);
    res.status(200).send({
      status: "success",
      data: { groupId: insertedId.toHexString() },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    console.log(groupId);
    const response = await getData(groupId);
    res.status(200).send({ status: "success", data: response });
  } catch (err) {
    console.error(err);
  }
};
