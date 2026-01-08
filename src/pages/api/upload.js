import multer from "multer";
import nextConnect from "next-connect";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `حدث خطأ: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `الطريقة غير مسموحة` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post((req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

export const config = {
  api: {
    bodyParser: false, // مهم جدًا
  },
};

export default apiRoute;