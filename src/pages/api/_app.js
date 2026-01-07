res.status(200).json({
  token,
  user: {
    id: admin._id,
    email: admin.email,
    role: admin.role,
  },
});