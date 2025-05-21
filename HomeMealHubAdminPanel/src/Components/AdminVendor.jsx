import { useEffect, useState } from "react";

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/vendor/data")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch vendor data");
        return response.json();
      })
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendor data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 pt-24 md:ml-64">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center sm:text-left drop-shadow">
        👨‍🍳 Vendor Submissions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-orange-200 bg-white shadow-2xl rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-200 to-yellow-100 text-orange-900 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Dish Image</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="hover:bg-orange-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-semibold">{vendor.name}</td>
                  <td className="px-6 py-4">{vendor.email}</td>
                  <td className="px-6 py-4">{vendor.phone}</td>
                  <td className="px-6 py-4 max-w-xs">
                    <div
                      className="line-clamp-2 text-sm text-gray-600"
                      title={vendor.description}
                    >
                      {vendor.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {vendor.dishImage ? (
                      <button
                        onClick={() => setSelectedImage(vendor.dishImage)}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-1 rounded-full shadow"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Loading vendor submissions...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Dish"
              className="w-full h-auto object-contain rounded-b-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendor;
