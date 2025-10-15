// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// interface Category {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
// }

// const UpdateImage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [name, setName] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imagescategory, setImagesCategory] = useState('');
//   const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
//   const [description, setDescription] = useState('');
//   const [bulletsdescription, setBulletsdescription] = useState('• ');
//   const [imageId, setImageId] = useState<string | null>(null);

//   useEffect(() => {
//     const id = searchParams?.get('imgid') || null;
//     setImageId(id);
//   }, [searchParams]);

//   useEffect(() => {
//   const fetchProductData = async () => {
//     const id = searchParams?.get('imgid');
//     if (!id) return;

//     try {
//       const res = await AxiosInstance.get(`/images/textbox_images?id=${id}`);
//       const imageArray = res?.data?.data?.data;

//       if (Array.isArray(imageArray)) {
//         const productData = imageArray.find((item) => String(item.id) === String(id));
//         if (productData) {
//           setImageId(id);
//           setName(productData.name || '');
//           setDescription(productData.description || '');
//           setImagesCategory(productData.imagescategory?.toString() || '');
//           setBulletsdescription(productData.bulletsdescription || '• ');

//           if (productData.image) {
//             const baseUrl = 'http://127.0.0.1:8000';
//             setImagePreview(`${baseUrl}${productData.image}`);
//           }
//         } else {
//           console.warn('Image with the given ID not found.');
//         }
//       } else {
//         console.warn('Invalid image array from API');
//       }
//     } catch (error) {
//       console.error('Error fetching image data:', error);
//     }
//   };

//   fetchProductData();
// }, [searchParams]);


//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/textbox_categories');
//         if (res?.data?.data?.data) {
//           setCategoryRecords(res.data.data.data);
//         }
//       } catch (error) {
//         console.error('Error occurred while fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (file && !file.type.startsWith("image/")) {
//       alert("Please select a valid image file.");
//       return;
//     }
//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('id', imageId || '');
//       formData.append('name', name || '');
//       if (image) formData.append('image', image);
//       formData.append('imagescategory', imagescategory || '');
//       formData.append('description', description || '');
//       formData.append('bulletsdescription', bulletsdescription || '');

//       const response = await AxiosInstance.post(`/images/images`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response?.data?.data) {
//         router.push('/imagespage');
//       } else {
//         alert('Update failed.');
//       }
//     } catch (error: any) {
//       const errMsg = error?.response?.data?.data || "Update failed. Please try again.";
//       alert(errMsg);
//       console.error('Error updating image:', error);
//     }
//   };

//   const handleBulletsInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     let value = (e.target as HTMLTextAreaElement).value;
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       setBulletsdescription(value + '\n• ');
//     } else {
//       setBulletsdescription(value);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
//           <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Update Luxury Image</h2>
//             <p className="mt-1 text-amber-100">Edit your luxury image details</p>
//           </div>

//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-amber-300 mb-1">Name <span className="text-red-500">*</span></label>
//                 <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white" value={name} onChange={(e) => setName(e.target.value)} required />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-amber-300 mb-1">Description</label>
//                 <textarea className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-medium text-amber-300 mb-1">Category <span className="text-red-500">*</span></label>
//                 <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white" value={imagescategory} onChange={(e) => setImagesCategory(e.target.value)} required />
//               </div>

//               {/* Bullet Points */}
//               <div>
//                 <label className="block text-sm font-medium text-amber-300 mb-1">Bullet Points</label>
//                 <textarea className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white" value={bulletsdescription} onChange={(e) => setBulletsdescription(e.target.value)} onKeyDown={handleBulletsInput} placeholder="• Type your first bullet here, then press Enter for the next..." rows={5} />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-amber-300 mb-1">Update Image</label>
//                 <div className="mt-1 flex items-center">
//                   <label className="cursor-pointer">
//                     <span className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white">Change Image</span>
//                     <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
//                   </label>
//                 </div>
//               </div>

//               {/* Preview */}
//               {imagePreview && (
//                 <div className="mt-4">
//                   <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
//                     <Image src={imagePreview.trim()} alt="Image Preview" fill className="object-contain p-4" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end pt-4 space-x-4">
//               <button type="button" onClick={() => router.push('/imagespage')} className="px-6 py-2 border border-gray-600 rounded-lg text-white bg-gray-700 hover:bg-gray-600">Cancel</button>
//               <button type="submit" className="px-6 py-2 border border-transparent rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900">Update Image</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateImage;




// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// interface Category {
//   id: number;
//   category: string;
// }

// const UpdateImage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [name, setName] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [category_id, setCategoryId] = useState('');
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [description, setDescription] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [imageId, setImageId] = useState<string | null>(null);

//   useEffect(() => {
//     const id = searchParams?.get('imgid') || null;
//     setImageId(id);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchImageData = async () => {
//       if (!imageId) return;

//       try {
//         const res = await AxiosInstance.get(`/images/${imageId}`);
//         const imageData = res?.data?.result?.data;

//         if (imageData) {
//           setName(imageData.name || '');
//           setDescription(imageData.description || '');
//           setCategoryId(imageData.category_id?.toString() || '');

//           if (imageData.image_url) {
//             setPreviewUrl(imageData.image_url);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching image data:', error);
//       }
//     };

//     fetchImageData();
//   }, [imageId]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await AxiosInstance.get('/image_categories');
//         if (res?.data?.result?.data) {
//           setCategories(res.data.result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       if (!file.type.startsWith("image/")) {
//         alert("Please select a valid image file.");
//         return;
//       }
//       setFile(file);

//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFile(null);
//       setPreviewUrl(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!imageId) return;

//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       if (file) formData.append('file', file);
//       formData.append('category_id', category_id);
//       formData.append('description', description);

//       const response = await AxiosInstance.patch(`/images/${imageId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data) {
//         router.push('/imagespage');
//       }
//     } catch (error) {
//       console.error('Error updating image:', error);
//       alert('Failed to update image. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 px-6 py-4">
//           <h2 className="text-2xl font-bold text-white">Update Image</h2>
//           <p className="mt-1 text-blue-100">Edit your image details</p>
//         </div>
        
//         {/* Form */}
//         <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Image Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <select
//               id="category_id"
//               className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={category_id}
//               onChange={(e) => setCategoryId(e.target.value)}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.category}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <input
//               type="text"
//               id="description"
//               className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
//               Update Image
//             </label>
//             <input
//               type="file"
//               id="file"
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               onChange={handleFileChange}
//               accept="image/*"
//             />
//           </div>

//           {/* Image Preview */}
//           {previewUrl && (
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image Preview
//               </label>
//               <div className="mt-1">
//                 <img
//                   src={previewUrl}
//                   alt="Preview"
//                   className="max-w-full h-auto max-h-64 rounded border border-gray-300"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Submit Buttons */}
//           <div className="flex justify-end pt-4 space-x-4">
//             <button
//               type="button"
//               onClick={() => router.push('/imagespage')}
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateImage;



'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

interface Category {
  id: number;
  category: string;
}

const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '/fallback-image.jpg';
    try {
      path = path.replace(/\\/g, '/'); // Fix for Windows paths
      if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
        return path;
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      return `${baseUrl}/${path.replace(/^\/+/, '')}`;
    } catch (error) {
      console.error('Image URL Error:', error);
      return '/fallback-image.jpg';
    }
  };
  
const UpdateImage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [imageId, setImageId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null); // for preview

  useEffect(() => {
    const id = searchParams?.get('imgid');
    setImageId(id);
  }, [searchParams]);

  // Fetch image data
  useEffect(() => {
    if (!imageId) return;
  
    const fetchImage = async () => {
      try {
        const res = await AxiosInstance.get(`/images/${imageId}`);
        const img = res?.data; // Directly use the root object
        console.log("Fetched image:", img);
  
        if (img) {
          setName(img.name || '');
          setDescription(img.description || '');
          setCategoryId(img.category_id?.toString() || '');
          setImagePath(img.image_path || null);
        }
      } catch (err) {
        console.error('Failed to fetch image:', err);
      }
    };
  
    fetchImage();
  }, [imageId]);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/image_categories');
        setCategories(res?.data?.result?.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setImagePath(URL.createObjectURL(file));
    } else {
      setFile(null);
      setImagePath(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageId) return;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category_id', category_id);
      if (file) formData.append('file', file);

      await AxiosInstance.patch(`/images/${imageId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      router.push('/imagespage');
    } catch (err) {
      console.error('Error updating image:', err);
      alert('Failed to update image.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-3xl font-semibold mb-6 text-amber-400">Update Image</h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Image Name */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* Upload New File */}
          <div>
            <label className="block mb-1">Change Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-500 file:text-black hover:file:bg-amber-600"
            />
          </div>

          {/* Preview */}
          {imagePath && (
            <div className="mt-4">
              <p className="mb-1 text-sm">Preview:</p>
              <Image
                src={getImageUrl(imagePath)}
                alt="Image Preview"
                width={500}
                height={300}
                className="rounded shadow-md object-cover max-h-64"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.push('/imagespage')}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-amber-500 text-black hover:bg-amber-600"
            >
              Update Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateImage;
