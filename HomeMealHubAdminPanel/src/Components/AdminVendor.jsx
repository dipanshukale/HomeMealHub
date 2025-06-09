import { useEffect, useState } from "react";

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const IMAGE_BASE_URL = "http://localhost:8000/";

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/vendor/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vendor data");
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load vendor submissions.");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/vendor/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setVendors((prev) => prev.filter((vendor) => vendor._id !== id));
      } else {
        console.error('Failed to delete vendor');
      }
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 pt-24 md:ml-64">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center sm:text-left drop-shadow">
        👨‍🍳 Vendor Submissions
      </h1>

      {loading && <p className="text-center text-gray-500 py-10">Loading vendor submissions...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}
      {!loading && !error && vendors.length === 0 && (
        <p className="text-center text-gray-500 py-10">No vendor submissions found.</p>
      )}

      {!loading && !error && vendors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-orange-200 bg-white shadow-2xl rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-200 to-yellow-100 text-orange-900 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Dish Image</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-orange-50 transition duration-200">
                  <td className="px-6 py-4 font-semibold">{vendor.name || "N/A"}</td>
                  <td className="px-6 py-4">{vendor.email || "N/A"}</td>
                  <td className="px-6 py-4">{vendor.phone || "N/A"}</td>
                  <td className="px-6 py-4 font-medium text-green-600">
                    ₹{vendor.price || "N/A"}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div
                      className="line-clamp-2 text-sm text-gray-600"
                      title={vendor.description || ""}
                    >
                      {vendor.description || "No description provided."}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {vendor.dishImage ? (
                      <button
                        onClick={() =>
                          setSelectedImage(
                            vendor.dishImage.startsWith("http")
                              ? vendor.dishImage
                              : `${IMAGE_BASE_URL}${vendor.dishImage}`
                          )
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-1 rounded-full shadow"
                        aria-label={`View dish image for ${vendor.name}`}
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedImage(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
              aria-label="Close image preview"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Dish Preview"
              className="w-full h-auto object-contain rounded-b-2xl"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendor;
