import { useEffect, useState } from "react";

export default function AdminUniversities() {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/admin/universities");
    const data = await res.json();
    setUniversities(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUniversity = async (e) => {
    e.preventDefault();

    await fetch("/api/admin/universities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, city }),
    });

    setName("");
    setCity("");
    fetchData();
  };

  const deleteUniversity = async (id) => {
    await fetch(`/api/admin/universities/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <div className="admin-dashboard">
      <h1>إدارة الجامعات</h1>

      <form onSubmit={addUniversity} className="admin-form">
        <input
          placeholder="اسم الجامعة"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="المدينة"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button>إضافة جامعة</button>
      </form>

      <ul>
        {universities.map((u) => (
          <li key={u._id}>
            {u.name} - {u.city}
            <button onClick={() => deleteUniversity(u._id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}