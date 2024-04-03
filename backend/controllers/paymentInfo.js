import { addPaymentInfo } from "../models/paymentInfoModel.js";

export const addInfo = async (req, res) => {
  const data = { ...req.body };
  try {
    const response = await addPaymentInfo(data);
    const { insertedId } = response;
    console.log(response);
    res.status(200).send({
      status: "success",
      data: { paymentId: insertedId.toHexString() },
    });
  } catch (err) {
    console.error(err);
  }
};

// export const getInfo = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     console.log(groupId);
//     const response = await getPaymentInfo(groupId);
//     res.status(200).send({ status: "success", data: response });
//   } catch (err) {
//     console.error(err);
//   }
// };
