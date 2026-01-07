import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "البيانات ناقصة" });
  }

  try {
    // ✅ الاتصال بقاعدة البيانات
    await connectDB();

    // ✅ التأكد إن الإيميل مش مستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "الإيميل مستخدم بالفعل" });
    }

    // ✅ تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ إنشاء المستخدم
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // 👈 مهم جدًا
    });

    return res.status(201).json({
      message: "تم إنشاء الحساب بنجاح",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}