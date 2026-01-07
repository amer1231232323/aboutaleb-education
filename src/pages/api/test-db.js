import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const count = await User.countDocuments();

    res.status(200).json({
      message: "DB Connected Successfully",
      users: count,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}