'use client'
import React, { useState, useEffect, useRef, useCallback, memo,  useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch,
  faPhone,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faClockRotateLeft,
  faTimes,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from '@/components/AxiosInstance'

// Memoized NavItem with optimized click handling
const NavItem = memo(({ item, pathname, closeMobileMenu }) => {
  const handleClick = useCallback((e) => {
    if (pathname === item.path) {
      e.preventDefault()
    }
    closeMobileMenu?.()
  }, [pathname, item.path, closeMobileMenu])

  return (
    <li className={`relative ${item.className || ''}`}>
      <Link
        href={item.path}
        prefetch={true}
        onClick={handleClick}
        className={`
          px-1 py-1 
          text-xs 
          font-medium 
          tracking-wide
          uppercase
          transition-colors
          duration-200
          block
          ${pathname === item.path ? 'text-black border-b border-black' : 'text-gray-600 hover:text-black'}
        `}
      >
        {item.name}
      </Link>
    </li>
  )
})

const NavbarCom = () => {
  const router = useRouter()
  const pathname = usePathname()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = React.useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Kids', path: '/kidspage' },
    { name: 'Sale', path: '/publicsalesproductpage' },
    { name: 'New IN', path: '/newarrivalspage', className: "hover-group" },
    { name: 'Shop', path: '/publicproducts' },
    { name: 'Collections', path: '/publiccategories' },
    { name: 'Contact', path: '/publiccontact' }
  ], [])

  // Optimized authentication check
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    setIsAuthenticated(!!token)
  }, [])

  // Optimized scroll handler with passive listeners
  useEffect(() => {
    let timeoutId = null
    
    const handleScroll = () => {
      if (timeoutId) {
        cancelAnimationFrame(timeoutId)
      }
      
      timeoutId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setIsVisible(currentScrollY <= 10 || currentScrollY < lastScrollY)
        setLastScrollY(currentScrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) {
        cancelAnimationFrame(timeoutId)
      }
    }
  }, [lastScrollY])

  // Load recent searches
  useEffect(() => {
    const savedSearches = typeof window !== 'undefined' ? localStorage.getItem('recentSearches') : null
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Debounce function with cleanup
  const debounce = useCallback((func, delay) => {
    let timer
    return function(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), delay)
    }
  }, [])

  // Memoized search function
  const fetchSearchResults = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    try {
      setIsLoading(true)
      const response = await AxiosInstance.get(`/ecommerce/categorysearch?q=${encodeURIComponent(query)}`)
      setSearchResults(response.data.data)
      
      if (response.data.data?.categories?.length > 0) {
        setRecentSearches(prev => {
          const newRecent = [
            query,
            ...prev.filter(s => s.toLowerCase() !== query.toLowerCase())
          ].slice(0, 5)
          localStorage.setItem('recentSearches', JSON.stringify(newRecent))
          return newRecent
        })
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResults(null)
    } finally {
      setIsLoading(false)
    }
  }, [])


  // Add this useEffect hook near your other useEffect hooks
useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  // Memoized debounced search
  const debouncedSearch = useMemo(() => 
    debounce((query) => {
      if (query.trim()) {
        fetchSearchResults(query)
      } else {
        setSearchResults(null)
      }
    }, 300),
    [debounce, fetchSearchResults]
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
    return () => {
      debouncedSearch.cancel?.()
    }
  }, [searchQuery, debouncedSearch])

  // Optimized search handler
  const handleSearch = useCallback(async (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return

    try {
      setIsLoading(true)
      debouncedSearch.cancel?.()
      
      const response = await AxiosInstance.get(`/ecommerce/categorysearch?q=${encodeURIComponent(query)}`)
      const data = response.data.data
      
      if (data?.categories?.length > 0) {
        const firstCategory = data.categories[0]
        router.push(`/categorywiseproductpage?categoryId=${firstCategory.id}&categoryName=${encodeURIComponent(firstCategory.name)}`)
      } else {
        router.push(`/publicproducts?search=${encodeURIComponent(query)}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      router.push(`/publicproducts?search=${encodeURIComponent(query)}`)
    } finally {
      setIsLoading(false)
      setShowSearchResults(false)
      setSearchQuery('')
    }
  }, [searchQuery, debouncedSearch, router])

  // Optimized key handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch(e)
    }
    if (e.key === 'Escape') {
      setShowSearchResults(false)
    }
  }, [handleSearch, searchQuery])

  const handleSearchFocus = useCallback(() => {
    setShowSearchResults(true)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults(null)
    setShowSearchResults(false)
    debouncedSearch.cancel?.()
  }, [debouncedSearch])

  // Optimized menu handlers
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  // Optimized logout
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/')
  }, [router])

  return (
    <>
      {/* Top Contact Bar */}
      <div className={`fixed w-full z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-gradient-to-r from-gray-900 to-black text-white`}>
        <div className="container mx-auto px-6 flex justify-between items-center h-4">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-900 group-hover:bg-gray-800 transition duration-200">
                <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-light tracking-wider">(+92) 333 1906382</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="relative flex items-center space-x-2 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                <span className="text-xs font-light tracking-wider">LOGOUT</span>
              </button>
            ) : (
              <Link 
                href="/Login" 
                prefetch={true}
                className="relative group"
              >
                <div className="flex items-center space-x-2">
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                  <span className="text-xs font-light tracking-wider">LOGIN</span>
                </div>
              </Link>
            )}
            
            <div className="h-4 w-px bg-gray-600"></div>
            
            <Link 
              href="/signup" 
              prefetch={true}
              className="relative group"
            >
              <div className="flex items-center space-x-2">
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                <FontAwesomeIcon icon={faUserPlus} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                <span className="text-xs font-light tracking-wider">SIGN UP</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
<div className={`fixed w-full z-40 mt-10 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white border-b border-gray-100`}>
  <div className="container mx-auto flex justify-between items-center px-6 py-2 h-10">
    {/* Logo and Mobile Menu Button */}
    <div className="flex items-center">
      <button 
        className="md:hidden mr-4 text-gray-600"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
      </button>
      
      <Link 
        href="/" 
        prefetch={true}
        className="text-black"
      >
        <span className="text-xl font-light tracking-widest uppercase">
          <span className="font-bold">GOHAR'S SHOP</span>
        </span>
      </Link>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:block">
      <ul className="flex space-x-6 items-center">
        {navItems.map((item) => (
          <NavItem 
            key={item.path} 
            item={item} 
            pathname={pathname}
            closeMobileMenu={closeMobileMenu}
          />
        ))}
      </ul>
    </nav>

    {/* Search and Cart */}
    <div className="flex items-center space-x-4">
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder="Search luxury collections..."
              className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 sm:w-60 text-sm text-black"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} className="text-sm" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-3 py-1 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={faSearch} className="text-sm" />
          </button>
        </form>

        {/* Updated Search Results Dropdown */}
        {showSearchResults && (
          <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {/* Recent Searches */}
            {!searchQuery && recentSearches.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 flex items-center">
                  <FontAwesomeIcon icon={faClockRotateLeft} className="mr-2 text-gray-400" />
                  RECENT SEARCHES
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="flex items-center w-full p-2 hover:bg-gray-50 transition-colors text-left text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchQuery(search);
                      setShowSearchResults(true);
                      fetchSearchResults(search);
                    }}
                  >
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-3 text-center text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-600 mx-auto mb-2"></div>
                <span className="text-xs">Searching luxury collections...</span>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && searchQuery && searchResults?.categories?.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50">
                  CATEGORIES ({searchResults.search_meta?.category_count || 0})
                </div>
                {searchResults.categories.slice(0, 5).map(category => (
                  <Link
                    key={category.id}
                    href={`/categorywiseproductpage?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
                    className="flex items-center p-2 hover:bg-amber-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden mr-3">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = '<div class="text-amber-600 text-xs">LUXE</div>';
                          }}
                        />
                      ) : (
                        <div className="text-amber-600 text-xs">LUXE</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{category.name}</div>
                      <div className="text-xs text-gray-500 truncate">{category.description || 'Premium collection'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && searchQuery && (!searchResults || searchResults?.categories?.length === 0) && (
              <div className="p-3 text-center text-gray-500 text-sm">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMobileMenuOpen && (
    <div 
      ref={mobileMenuRef}
      className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50"
    >
      <ul className="py-2">
        {navItems.map((item) => (
          <li key={item.path} className="border-b border-gray-100 last:border-b-0">
            <NavItem 
              item={item} 
              pathname={pathname}
              closeMobileMenu={closeMobileMenu}
            />
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

{/* Spacer */}
<div className="h-20"></div>
    </>
  )
}

export default NavbarCom