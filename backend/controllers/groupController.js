import { addData } from "../models/groupModel.js";

export const addGroup = async (req, res) => {
  const data = { ...req.body };
  try {
    const response = await addData(data);
    console.log(response);
    res.status(200).send({status: 'success', message: 'Data added successfully'});
  } catch(err) {
    console.error(err);
  }
};