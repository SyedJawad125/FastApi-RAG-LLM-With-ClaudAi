// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';
// import Image from 'next/image';

// const ImagesCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);

//   const [data, setData] = useState({
//     images: [],
//     count: 0,
//     total_pages: 1,
//     current_page: 1,
//     limit: 12,
//     offset: 0,
//   });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageErrors, setImageErrors] = useState({}); // ✅ Added state

//   const getImageUrl = (path) => {
//     if (!path) return '/fallback-image.jpg';
//     try {
//       if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
//         return path;
//       }
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
//       return `${baseUrl}/${path.replace(/^\/+/, '')}`;
//     } catch (error) {
//       console.error('Error constructing image URL:', error);
//       return '/fallback-image.jpg';
//     }
//   };

//   const verifyImage = async (url) => {
//     try {
//       const res = await fetch(url, { method: 'HEAD' });
//       return res.ok;
//     } catch {
//       return false;
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, [data.current_page, data.limit, searchTerm]);

//   const fetchImages = async () => {
//     setIsLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: data.current_page.toString(),
//         limit: data.limit.toString(),
//         ...(searchTerm && { search: searchTerm })
//       }).toString();

//       const res = await AxiosInstance.get(`/images?${queryParams}`);

//       if (res?.data?.status === "SUCCESSFUL" && res?.data?.result) {
//         const verifiedImages = await Promise.all(
//           res.data.result.data.map(async (item) => {
//             const imageUrl = getImageUrl(item.image_path);
//             const exists = await verifyImage(imageUrl);
//             return { ...item, imageUrl, imageExists: exists };
//           })
//         );

//         setData(prev => ({
//           ...prev,
//           images: verifiedImages || [],
//           count: res.data.result.count || 0,
//           total_pages: Math.ceil((res.data.result.count || 0) / prev.limit),
//         }));
//       } else {
//         toast.error('Failed to fetch images');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail || 'Error fetching images';
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/images/${id}`);
//       if (res?.data?.status === "SUCCESSFUL") {
//         toast.success(res.data.message || 'Image deleted successfully!');
//         fetchImages();
//       }
//     } catch (error) {
//       if (error.response?.status === 404) {
//         toast.error('Image not found');
//       } else {
//         const errorMessage = error.response?.data?.detail || 'Error deleting image';
//         toast.error(errorMessage);
//       }
//     }
//   };

//   const updateRecord = async (imgid) => {
//     router.push(`/updateimagespage?imgid=${imgid}`);
//   };

//   const handleImageError = (id) => {
//     setImageErrors(prev => ({ ...prev, [id]: true }));
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setData(prev => ({ ...prev, current_page: 1 }));
//   };

//   const handlePageChange = (page) => {
//     setData(prev => ({ ...prev, current_page: page }));
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     setData(prev => ({ ...prev, limit: newLimit, current_page: 1 }));
//   };

//   if (!permissions.read_image) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
//         <div className="text-center p-8 max-w-md">
//           <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
//           <p className="text-gray-300 mb-6">
//             You don't have permission to view Images. Please contact your administrator.
//           </p>
//           <button
//             onClick={() => router.push('/')}
//             className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//         <ToastContainer position="top-right" autoClose={2000} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
//       <ToastContainer position="top-right" autoClose={2000} />
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white">LUXURY IMAGES</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
//           </div>
//           {permissions.create_image && (
//             <button
//               onClick={() => router.push('/addimagespage')}
//               className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black"
//             >
//               Add Images
//             </button>
//           )}
//           <button
//             onClick={() => router.push('/ImagesCategoryPage')}
//             className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black"
//           >
//             Images Category
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800/50 p-4 rounded-xl mb-8 gap-4">
//           <div className="text-amber-400">
//             Showing {data.images.length} of {data.count} items
//           </div>

//           <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search images..."
//               className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white"
//             />
//             <select
//               value={data.limit}
//               onChange={handleLimitChange}
//               className="bg-gray-700 text-white rounded-full px-3 py-2"
//             >
//               <option value="12">12 per page</option>
//               <option value="24">24 per page</option>
//               <option value="36">36 per page</option>
//               <option value="48">48 per page</option>
//             </select>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(12)].map((_, idx) => (
//               <div key={idx} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-xl aspect-square"></div>
//                 <div className="mt-3 h-5 bg-gray-800 rounded w-3/4"></div>
//                 <div className="mt-2 h-4 bg-gray-800 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : data.images.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {data.images.map(item => (
//               <div
//                 key={item.id}
//                 className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-400/20 transition-all"
//               >
//                 <div className="aspect-square bg-gray-800 relative">
//                   {imageErrors[item.id] ? (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <span className="text-gray-500">Image unavailable</span>
//                     </div>
//                   ) : (
//                     <Image
//                       src={getImageUrl(item.image_path)}
//                       alt={item.name || 'Image'}
//                       width={400}
//                       height={400}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       onError={() => handleImageError(item.id)}
//                       priority={data.current_page === 1 && data.images.indexOf(item) < 4}
//                     />
//                   )}
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                 <div className="p-4 absolute bottom-0 left-0 right-0">
//                   <h3 className="text-lg font-medium text-white line-clamp-1">{item.name}</h3>
//                   <p className="text-xs text-gray-300 line-clamp-2">{item.description}</p>
//                   {/* ✅ Category Name */}
//                   {item.category?.category && (
//                     <p className="text-xs mt-1 text-amber-400 italic">
//                       Category: {item.category.category}
//                     </p>
//                   )}
//                   <div className="flex justify-between items-center mt-3">
//                     <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       {permissions.update_image && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             updateRecord(item.id);
//                           }}
//                           className="p-2 bg-amber-600/90 rounded-lg hover:bg-amber-600"
//                         >
//                           ✏️
//                         </button>
//                       )}
//                       {permissions.delete_image && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             deleteRecord(item.id);
//                           }}
//                           className="p-2 bg-red-600/90 rounded-lg hover:bg-red-600"
//                         >
//                           🗑️
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 text-gray-300">
//             <p>No images found.</p>
//             {permissions.create_image && (
//               <button
//                 onClick={() => router.push('/addimagespage')}
//                 className="mt-6 px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white"
//               >
//                 Add Images
//               </button>
//             )}
//           </div>
//         )}

//         {data.total_pages > 1 && (
//           <div className="flex justify-center mt-10 space-x-2">
//             {[...Array(data.total_pages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`px-3 py-1 rounded-full ${
//                   data.current_page === i + 1
//                     ? 'bg-amber-600 text-white'
//                     : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImagesCom;





'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import Image from 'next/image';

const ImagesCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);

  const [data, setData] = useState({
    images: [],
    count: 0,
    total_pages: 1,
    current_page: 1,
    limit: 12,
    offset: 0,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (path) => {
    if (!path) return '/fallback-image.jpg';
    try {
      if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
        return path;
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      return `${baseUrl}/${path.replace(/^\/+/, '')}`;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return '/fallback-image.jpg';
    }
  };

  const verifyImage = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchImages();
  }, [data.current_page, data.limit, searchTerm]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: data.current_page.toString(),
        limit: data.limit.toString(),
        ...(searchTerm && { search: searchTerm })
      }).toString();

      const res = await AxiosInstance.get(`/images?${queryParams}`);

      if (res?.data?.status === "SUCCESSFUL" && res?.data?.result) {
        const verifiedImages = await Promise.all(
          res.data.result.data.map(async (item) => {
            const imageUrl = getImageUrl(item.image_path);
            const exists = await verifyImage(imageUrl);
            return { ...item, imageUrl, imageExists: exists };
          })
        );

        setData(prev => ({
          ...prev,
          images: verifiedImages || [],
          count: res.data.result.count || 0,
          total_pages: Math.ceil((res.data.result.count || 0) / prev.limit),
        }));
      } else {
        toast.error('Failed to fetch images');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error fetching images';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/images/${id}`);
      if (res?.data?.status === "SUCCESSFUL") {
        toast.success(res.data.message || 'Image deleted successfully!');
        fetchImages();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('Image not found');
      } else {
        const errorMessage = error.response?.data?.detail || 'Error deleting image';
        toast.error(errorMessage);
      }
    }
  };

  const updateRecord = async (imgid) => {
    router.push(`/updateimagespage?imgid=${imgid}`);
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setData(prev => ({ ...prev, current_page: 1 }));
  };

  const handlePageChange = (page) => {
    setData(prev => ({ ...prev, current_page: page }));
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setData(prev => ({ ...prev, limit: newLimit, current_page: 1 }));
  };

  if (!permissions.read_image) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view Images. Please contact your administrator.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white"
          >
            Return to Dashboard
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white">LUXURY IMAGES</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
          </div>
          {permissions.create_image && (
            <button
              onClick={() => router.push('/addimagespage')}
              className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black"
            >
              Add Images
            </button>
          )}
          <button
            onClick={() => router.push('/ImagesCategoryPage')}
            className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black"
          >
            Images Category
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800/50 p-4 rounded-xl mb-8 gap-4">
          <div className="text-amber-400">
            Showing {data.images.length} of {data.count} items
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search images..."
              className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white"
            />
            <select
              value={data.limit}
              onChange={handleLimitChange}
              className="bg-gray-700 text-white rounded-full px-3 py-2"
            >
              <option value="12">12 per page</option>
              <option value="24">24 per page</option>
              <option value="36">36 per page</option>
              <option value="48">48 per page</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl aspect-square"></div>
                <div className="mt-3 h-5 bg-gray-800 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : data.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.images.map(item => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-400/20 transition-all"
              >
                <div className="aspect-square bg-gray-800 relative">
                  {imageErrors[item.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <span className="text-gray-500">Image unavailable</span>
                    </div>
                  ) : (
                    <Image
                      src={getImageUrl(item.image_path)}
                      alt={item.name || 'Image'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(item.id)}
                      priority={data.current_page === 1 && data.images.indexOf(item) < 4}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="p-4 absolute bottom-0 left-0 right-0">
                  <h3 className="text-lg font-medium text-white line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">{item.description}</p>
                  {item.category?.category && (
                    <p className="text-xs mt-1 text-amber-400 italic">
                      Category: {item.category.category}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {permissions.update_image && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateRecord(item.id);
                          }}
                          className="p-2 bg-amber-600/90 rounded-lg hover:bg-amber-600"
                        >
                          ✏️
                        </button>
                      )}
                      {permissions.delete_image && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRecord(item.id);
                          }}
                          className="p-2 bg-red-600/90 rounded-lg hover:bg-red-600"
                        >
                          🗑️
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedImage(item);
                          setShowModal(true);
                        }}
                        className="p-2 bg-blue-600/90 rounded-lg hover:bg-blue-600 text-white"
                      >
                        🔍
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300">
            <p>No images found.</p>
            {permissions.create_image && (
              <button
                onClick={() => router.push('/addimagespage')}
                className="mt-6 px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white"
              >
                Add Images
              </button>
            )}
          </div>
        )}

        {data.total_pages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(data.total_pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full ${
                  data.current_page === i + 1
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* ✅ Modal Popup */}
        {showModal && selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a] text-white rounded-xl shadow-xl border border-gray-800 p-6 w-full max-w-md animate-fade-in">
      {/* Close button (now static) */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute -top-2 -right-0 bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white border border-gray-700 shadow-lg transition-colors"
        title="Close"
      >
        ✖
      </button>

      {/* Image */}
      <div className="overflow-hidden rounded-lg shadow-lg mb-4 group">
        <Image
          src={getImageUrl(selectedImage.image_path)}
          alt={selectedImage.name}
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-transform mt-2 duration-500 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-amber-400 mb-1 tracking-tight">
          {selectedImage.name}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-2">{selectedImage.description}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {selectedImage.category?.category && (
            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-amber-300 border border-gray-700">
              {selectedImage.category.category}
            </span>
          )}
          
          <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400 border border-gray-700">
            {new Date(selectedImage.upload_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default ImagesCom;
