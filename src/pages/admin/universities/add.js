import { useState } from "react";
import { useRouter } from "next/router";

export default function AddUniversity() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/universities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/universities");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="اسم الجامعة" onChange={handleChange} />
      <input name="city" placeholder="المدينة" onChange={handleChange} />
      <input name="image" placeholder="رابط الصورة" onChange={handleChange} />
      <textarea name="description" placeholder="وصف" onChange={handleChange} />
      <button>إضافة</button>
    </form>
  );
}