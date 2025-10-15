// components/LuxuryCategorySearch.js
'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MagnifyingGlass, X, CaretDown } from '@phosphor-icons/react'
import AxiosInstance from '@/components/AxiosInstance'


const LuxuryCategorySearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState(null)
  const [suggestions, setSuggestions] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef(null)
  const router = useRouter()

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const fetchResults = async (query) => {
    try {
      const response = await AxiosInstance.get(`/ecommerce/categorysearch?q=${query}`)
      setResults(response.data.data)
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const fetchSuggestions = async (query) => {
    try {
      const response = await AxiosInstance.fetch(`/ecommerce/categorysearch/suggestions?q=${query}`)
      const data = await response.json()
      setSuggestions(data.data)
    } catch (error) {
      console.error('Suggestions error:', error)
    }
  }

  const debouncedFetchResults = debounce(fetchResults, 300)
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 200)

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetchResults(searchQuery)
      debouncedFetchSuggestions(searchQuery)
    } else {
      setResults(null)
      setSuggestions(null)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultClick = (category) => {
    router.push(`/categorywiseproductpage?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`)
    setIsFocused(false)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
    setResults(null)
    setSuggestions(null)
    setIsFocused(false)
  }

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <div className={`flex items-center border-b-2 ${isFocused ? 'border-amber-500' : 'border-gray-300'} transition-colors duration-300`}>
        <MagnifyingGlass className="text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search luxury collections..."
          className="w-full py-3 px-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-light"
        />
        {searchQuery && (
          <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {(isFocused && (results || suggestions)) && (
        <div className="absolute z-50 w-full mt-2 bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Suggestions Panel */}
          {suggestions && (!results || searchQuery.length < 3) && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Popular Collections
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.popular_categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(category.name)
                      setIsFocused(true)
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-amber-50 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Trending Now
              </h3>
              <div className="space-y-2">
                {suggestions.trending_categories.map((category) => (
                  <div
                    key={category.slug}
                    onClick={() => router.push(`/categorywiseproductpage?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`)}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded"
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-amber-600">Trending</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Panel */}
          {results && searchQuery.length >= 3 && (
            <div className="divide-y divide-gray-100">
               {results?.categories?.length > 0 ? (
                    <div>
                      <div className="px-4 py-2 bg-amber-50 text-amber-800 font-medium">
                        COLLECTIONS ({results.search_meta.category_count})
                      </div>
                      {results.categories.map(category => (
                    <div
                      key={category.id}
                      onClick={() => handleResultClick(category)}
                      className="flex items-center p-4 hover:bg-amber-50 cursor-pointer border-b border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                        {category.image ? (
                          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-amber-600 text-xs">LUXE</div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No collections found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LuxuryCategorySearch