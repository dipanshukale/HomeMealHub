import { useEffect, useState } from "react";

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/vendor/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch vendor data");
        }
        return response.json();
      })
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendor data:", err));
  }, []);

  return (
    <div className="p-4 mt-20 md:ml-64">
      <h1 className="text-3xl font-bold font-serif mb-6 text-gray-800 text-center sm:text-left">
        Vendor Submissions
      </h1>

      <div className="w-full overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Phone</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Dish Description</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Dish Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{vendor.name}</td>
                  <td className="px-4 py-3">{vendor.email}</td>
                  <td className="px-4 py-3">{vendor.phone}</td>
                  <td className="px-4 py-3 max-w-xs break-words">{vendor.description}</td>
                  <td className="px-4 py-3">
                    {vendor.dishImage ? (
                      <button
                        onClick={() => setSelectedImage(vendor.dishImage)}
                        className="bg-blue-500 text-white text-xs px-3 cursor-pointer py-1 rounded hover:bg-blue-600"
                      >
                        View Image
                      </button>
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-lg cursor-pointer bg-white p-1 rounded-full text-black"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Dish"
              className="rounded-md w-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendor;
