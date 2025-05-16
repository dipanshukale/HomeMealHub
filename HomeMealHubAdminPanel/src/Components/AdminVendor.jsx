import { useEffect, useState } from "react";
import axios from "axios";

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/vendor/vendordata")
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendor data:", err));
  }, []);

  return (
    <div className="p-4 mt-16 md:ml-64">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vendor Submissions</h1>

      <div className="w-full  overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 bg-white  rounded-lg">
          <thead className="bg-gray-100 text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Dish Description</th>
              <th className="px-4 py-3 text-left">Dish Image</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{vendor.name}</td>
                  <td className="px-4 py-3">{vendor.email}</td>
                  <td className="px-4 py-3">{vendor.phone}</td>
                  <td className="px-4 py-3">{vendor.description}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`http://localhost:8000/uploads/${vendor.dishImage}`}
                      alt="Dish"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVendor;
