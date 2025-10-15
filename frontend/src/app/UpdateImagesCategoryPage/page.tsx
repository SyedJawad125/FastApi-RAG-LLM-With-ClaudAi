'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: string;
  category: string;
  image?: string;
}

const UpdateCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    category: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch category data based on categoryId
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId) {
        try {
          const res = await AxiosInstance.get(`/image_categories/${categoryId}`);
          console.log("Full API Response:", res);
          
          const categoryData = res?.data?.data?.data?.[0] || 
                              res?.data?.data?.[0] || 
                              res?.data?.[0] || 
                              res?.data;
          
          if (categoryData) {
            setFormData({
              category: categoryData.category || categoryData.category || '',
            });
          }
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
  
    setIsLoading(true);
    try {
      const response = await AxiosInstance.patch(`/image_categories/${categoryId}`, {
        category: formData.category,
      });
  
      if (response) {
        router.push('/ImagesCategoryPage');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-5 shadow-md">
        <h2 className="text-3xl font-bold text-white">Edit Images Category</h2>
        <p className="mt-1 text-amber-100">Update the details of your Images Category</p>
      </div>

      {/* Form */}
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category Name */}
          <div className="md:col-span-2">
            <label htmlFor="category" className="block text-sm font-semibold text-amber-400 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={() => router.push('/ImagesCategoryPage')}
            className="mr-4 px-6 py-2 border border-gray-600 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition shadow-lg ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Updating...' : 'Update Category'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default UpdateCategory;