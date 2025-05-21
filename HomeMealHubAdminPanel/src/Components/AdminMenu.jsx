import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', description: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get('/api/menu');
    setMenuItems(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`/api/menu/${editId}`, form);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('/api/menu', form);
    }
    setForm({ name: '', category: '', price: '', description: '', imageUrl: '' });
    fetchMenu();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/menu/${id}`);
    fetchMenu();
  };

  return (
    <div className="ml-0 md:ml-64 p-6 pt-24 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Menu Manager</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">{isEditing ? 'Edit' : 'Add'} Dish</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Dish Name" className="p-2 border rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="p-2 border rounded" required />
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded" />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="mt-3 w-full p-2 border rounded" required />
        <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded">{isEditing ? 'Update' : 'Add'} Dish</button>
      </form>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Current Menu</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">₹{item.price}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMenu;
