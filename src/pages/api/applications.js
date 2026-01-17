import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            const applications = await Application.find().sort({ createdAt: -1 });
            return res.status(200).json(applications);
        } catch (err) {
            return res.status(500).json({ message: "Error fetching applications" });
        }
    }

    if (req.method === "POST") {
        try {
            const application = await Application.create(req.body);
            return res.status(201).json(application);
        } catch (err) {
            return res.status(500).json({ message: "Error creating application" });
        }
    }

    res.status(405).json({ message: "Method not allowed" });
}
