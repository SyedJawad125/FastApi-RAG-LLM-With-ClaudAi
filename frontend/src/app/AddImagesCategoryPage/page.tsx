'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosInstance.post('/image_categories', { category });
      if (response) {
        toast.success('Category added successfully!');
        setTimeout(() => {
          router.push('/ImagesCategoryPage');
        }, 1500); // Delay to allow toast to show
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md mx-auto">
        <div className="bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-5 shadow-md">
            <h2 className="text-3xl font-bold text-white">Add New Category</h2>
            <p className="mt-1 text-amber-100">Create a new category below</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              
              {/* Category Input */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-amber-400 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  maxLength={50}
                  placeholder="Enter category name"
                />
                <p className="mt-1 text-xs text-gray-400">Max 50 characters allowed</p>
              </div>
            </div>

            {/* Submit Button Group */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/categories')}
                className="px-6 py-2 text-sm font-medium rounded-lg text-white bg-gray-800 border border-gray-600 hover:bg-gray-700 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-lg transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
