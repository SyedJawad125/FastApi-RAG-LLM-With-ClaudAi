// import React from 'react';
// import Image from 'next/image';
// import logo from '../../public/images/logo5.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer id="footer" className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             <div className="flex justify-center md:justify-start ml-20">
//                 <a href="/">
//                     <Image src={logo} alt="Logo" width={150} height={75} className="footer-logo" />
//                 </a>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">SUPPORT</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/faq" className="hover:underline">FAQ</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                     <li className="mb-2"><a href="/returns" className="hover:underline">Returns</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
//                     <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Our Services</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/publicproduct" className="hover:underline">Products</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
//                 <ul>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />DHA 2, Islamabad Pakistan.</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 333 1906382</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 51 0000000</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />nicenick1992@gmail.com</li>
//                 </ul>
//                 <div className="flex justify-center md:justify-start space-x-4 mt-4">
//                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaFacebookF />
//                     </a>
//                     <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaTwitter />
//                     </a>
//                     <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaInstagram />
//                     </a>
//                     <a href="https://wa.me/923331906382" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaWhatsapp />
//                     </a>
//                     <a href="https://www.linkedin.com/in/syed-jawad-ali-080286b9/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaLinkedinIn />
//                     </a>
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaYoutube />
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="text-center mt-8">
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//     </footer>

//     );
// };

// export default Footer;




// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import logo from '../../public/images/logo5.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhone, faEnvelope, faGem } from '@fortawesome/free-solid-svg-icons';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//     // Define all links in a structured way
//     const footerLinks = {
//         support: [
//             { name: 'FAQ', path: '/faq' },
//             { name: 'Contact Us', path: '/contact' },
//             { name: 'Returns', path: '/returns' },
//             { name: 'Shipping Info', path: '/shipping-info' },
//             { name: 'Size Guide', path: '/size-guide' }
//         ],
//         quickLinks: [
//             { name: 'Home', path: '/' },
//             { name: 'About Us', path: '/about' },
//             { name: 'Shop', path: '/publicproducts' },
//             { name: 'Collections', path: '/publiccategories' },
//             { name: 'Sales', path: '/publicsalesproductpage' }
//         ],
//         services: [
//             { name: 'Gift Cards', path: '/gift-cards' },
//             { name: 'Personal Styling', path: '/personal-styling' },
//             { name: 'VIP Members', path: '/vip-members' },
//             { name: 'Store Locator', path: '/store-locator' },
//             { name: 'Bespoke Services', path: '/bespoke-services' }
//         ],
//         legal: [
//             { name: 'Privacy Policy', path: '/privacy-policy' },
//             { name: 'Terms of Service', path: '/terms-of-service' },
//             { name: 'Cookies', path: '/cookies' }
//         ],
//         social: [
//             { icon: FaFacebookF, url: 'https://facebook.com/yourpage' },
//             { icon: FaInstagram, url: 'https://instagram.com/yourpage' },
//             { icon: FaTwitter, url: 'https://twitter.com/yourpage' },
//             { icon: FaPinterestP, url: 'https://pinterest.com/yourpage' },
//             { icon: FaLinkedinIn, url: 'https://linkedin.com/company/yourpage' },
//             { icon: FaYoutube, url: 'https://youtube.com/yourchannel' },
//             { icon: FaWhatsapp, url: 'https://wa.me/923331906382' }
//         ]
//     };

//     return (
//         <footer id="footer" className="bg-gray-700 text-white pt-16 pb-12 border-t border-gold-500">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//                     {/* Logo Section */}
//                     <div className="flex flex-col items-center md:items-start">
//                         <Link href="/" className="mb-8 transition-transform hover:scale-105 duration-500">
//                             <div className="relative">
//                                 <Image 
//                                     src={logo} 
//                                     alt="Luxury Brand Logo" 
//                                     width={200} 
//                                     height={100} 
//                                     className="footer-logo object-contain filter brightness-110"
//                                     priority
//                                 />
//                                 <div className="absolute inset-0 border border-gold-500 opacity-20 pointer-events-none"></div>
//                             </div>
//                         </Link>
//                         <p className="text-gray-400 text-sm mb-8 leading-relaxed text-center md:text-left">
//                             Elevating everyday experiences through exquisite craftsmanship and timeless design. 
//                             Our collections embody the pinnacle of luxury living.
//                         </p>
//                         <div className="flex flex-wrap gap-3">
//                             {footerLinks.social.map((social, index) => (
//                                 <a 
//                                     key={index}
//                                     href={social.url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="bg-gray-900 hover:bg-gold-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-gold-500"
//                                     aria-label={social.icon.name}
//                                 >
//                                     <social.icon className="text-lg text-gold-400 hover:text-white" />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Support Links */}
//                     <div className="flex flex-col">
//                         <h2 className="text-xl font-serif font-medium mb-6 pb-3 border-b border-gold-500/30 flex items-center">
//                             <FontAwesomeIcon icon={faGem} className="text-gold-500 mr-2 text-sm" />
//                             SUPPORT
//                         </h2>
//                         <ul className="space-y-3">
//                             {footerLinks.support.map((link) => (
//                                 <li key={link.name}>
//                                     <Link 
//                                         href={link.path} 
//                                         className="text-gray-400 hover:text-gold-400 transition-colors duration-300 flex items-start group"
//                                     >
//                                         <span className="text-gold-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
//                                         <span>{link.name}</span>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Quick Links */}
//                     <div className="flex flex-col">
//                         <h2 className="text-xl font-serif font-medium mb-6 pb-3 border-b border-gold-500/30 flex items-center">
//                             <FontAwesomeIcon icon={faGem} className="text-gold-500 mr-2 text-sm" />
//                             QUICK LINKS
//                         </h2>
//                         <ul className="space-y-3">
//                             {footerLinks.quickLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <Link 
//                                         href={link.path} 
//                                         className="text-gray-400 hover:text-gold-400 transition-colors duration-300 flex items-start group"
//                                     >
//                                         <span className="text-gold-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
//                                         <span>{link.name}</span>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Services */}
//                     <div className="flex flex-col">
//                         <h2 className="text-xl font-serif font-medium mb-6 pb-3 border-b border-gold-500/30 flex items-center">
//                             <FontAwesomeIcon icon={faGem} className="text-gold-500 mr-2 text-sm" />
//                             SERVICES
//                         </h2>
//                         <ul className="space-y-3">
//                             {footerLinks.services.map((link) => (
//                                 <li key={link.name}>
//                                     <Link 
//                                         href={link.path} 
//                                         className="text-gray-400 hover:text-gold-400 transition-colors duration-300 flex items-start group"
//                                     >
//                                         <span className="text-gold-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
//                                         <span>{link.name}</span>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Contact Info */}
//                     <div className="flex flex-col">
//                         <h2 className="text-xl font-serif font-medium mb-6 pb-3 border-b border-gold-500/30 flex items-center">
//                             <FontAwesomeIcon icon={faGem} className="text-gold-500 mr-2 text-sm" />
//                             CONTACT
//                         </h2>
//                         <ul className="space-y-4">
//                             <li className="flex items-start">
//                                 <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-gold-500" />
//                                 <span className="text-gray-400">DHA 2, Islamabad Pakistan</span>
//                             </li>
//                             <li className="flex items-center">
//                                 <FontAwesomeIcon icon={faPhone} className="mr-3 text-gold-500" />
//                                 <a href="tel:+923331906382" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">(+92) 333 1906382</a>
//                             </li>
//                             <li className="flex items-center">
//                                 <FontAwesomeIcon icon={faPhone} className="mr-3 text-gold-500" />
//                                 <a href="tel:+92510000000" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">(+92) 51 0000000</a>
//                             </li>
//                             <li className="flex items-center">
//                                 <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-gold-500" />
//                                 <a href="mailto:contact@luxurybrand.com" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">contact@luxurybrand.com</a>
//                             </li>
//                         </ul>
                        
//                         <h3 className="text-lg font-serif font-medium mt-8 mb-4 flex items-center">
//                             <FontAwesomeIcon icon={faGem} className="text-gold-500 mr-2 text-xs" />
//                             NEWSLETTER
//                         </h3>
//                         <form className="flex flex-col">
//                             <input 
//                                 type="email" 
//                                 name="email"
//                                 placeholder="Your email address" 
//                                 className="bg-gray-900 text-white px-4 py-3 w-full rounded focus:outline-none focus:ring-1 focus:ring-gold-500 border border-gray-700 mb-3 placeholder-gray-500"
//                                 required
//                             />
//                             <button 
//                                 type="submit"
//                                 className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white px-6 py-3 rounded transition-all duration-300 font-medium tracking-wider uppercase text-sm"
//                             >
//                                 Subscribe
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Bottom Footer */}
//                 <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
//                     <p className="text-gray-500 text-xs mb-0 md:mb-0 tracking-widest">
//                         &copy; {new Date().getFullYear()} LUXURY BRAND. ALL RIGHTS RESERVED.
//                     </p>
//                     <div className="flex flex-wrap gap-6 justify-center">
//                         {footerLinks.legal.map((link) => (
//                             <Link 
//                                 key={link.name}
//                                 href={link.path} 
//                                 className="text-gray-500 hover:text-gold-400 transition-colors duration-300 text-xs tracking-widest uppercase"
//                             >
//                                 {link.name}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;





import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const footerLinks = {
        shop: [
            { name: 'Home', path: '/' },
            { name: 'Kids', path: '/kidspage' },
            { name: 'Shop', path: '/publicproducts' },
            { name: 'Collections', path: '/publiccategories' },
            { name: 'Sales', path: '/publicsalesproductpage' },
            { name: 'New In', path: '/newarrivalspage' }
        ],
        customerService: [
            { name: 'Contact Us', path: '/publiccontact' },
            { name: 'Shipping Info', path: '/shipping-info' },
            { name: 'Returns & Exchanges', path: '/returns' },
            { name: 'FAQ', path: '/faq' },
            { name: 'Size Guide', path: '/size-guide' }
        ],
        about: [
            { name: 'About Us', path: '/about' },
            { name: 'Personal Styling', path: '/personal-styling' },
            { name: 'VIP Members', path: '/vip-members' },
            { name: 'Store Locator', path: '/store-locator' },
            { name: 'Bespoke Services', path: '/bespoke-services' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '/privacy-policy' },
            { name: 'Terms of Service', path: '/terms-of-service' },
            { name: 'Cookies', path: '/cookies' }
        ],
        social: [
            { icon: FaFacebookF, url: 'https://facebook.com/yourpage' },
            { icon: FaInstagram, url: 'https://instagram.com/yourpage' },
            { icon: FaTwitter, url: 'https://twitter.com/yourpage' },
            { icon: FaPinterestP, url: 'https://pinterest.com/yourpage' },
            { icon: FaLinkedinIn, url: 'https://linkedin.com/company/yourpage' },
            { icon: FaYoutube, url: 'https://youtube.com/yourchannel' },
            { icon: FaWhatsapp, url: 'https://wa.me/923331906382' }
        ]
    };

    return (
    <footer className="bg-black text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Info */}
            <div>
            <div className="mb-6">
                <Image 
                src={logo} 
                alt="Luxury Brand Logo" 
                width={150} 
                height={75} 
                className="object-contain"
                priority
                />
            </div>
            <p className="text-gray-400 text-sm mb-6">
                Elevating everyday experiences through exquisite craftsmanship and timeless design. 
                Our collections embody the pinnacle of luxury living.
            </p>
            <div className="flex gap-2">
                {footerLinks.social.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-white hover:text-black p-2 rounded-full transition-colors"
                    aria-label={social.icon.name}
                >
                    <social.icon className="text-lg" />
                </a>
                ))}
            </div>
            </div>

            {/* Shop */}
            <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
                {footerLinks.shop.map((link) => (
                <li key={link.name}>
                    <Link href={link.path} className="hover:text-white transition-colors">{link.name}</Link>
                </li>
                ))}
            </ul>
            </div>

            {/* Customer Service */}
            <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
                {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                    <Link href={link.path} className="hover:text-white transition-colors">{link.name}</Link>
                </li>
                ))}
            </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-0.5" />
                <span>DHA 2, Islamabad, Pakistan</span>
                </li>
                <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+923331906382" className="hover:text-white transition-colors">(+92) 333 1906382</a>
                </li>
                <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:contact@luxurybrand.com" className="hover:text-white transition-colors">contact@luxurybrand.com</a>
                </li>
            </ul>

            <h3 className="text-lg font-serif font-semibold mb-3">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for new arrivals & promotions.</p>
            <div className="flex">
                <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-black rounded-l-md focus:outline-none"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-md transition">
                Subscribe
                </button>
            </div>
            </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 -mb-8 border-t border-gray-800 pt-6 text-sm text-gray-400 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0 ml-20">© {new Date().getFullYear()} Luxury Brand. All rights reserved.</p>
            <div className="flex gap-4 mr-20 flex-wrap justify-center">
                {footerLinks.legal.map((link) => (
                <Link key={link.name} href={link.path} className="hover:text-white transition-colors">
                    {link.name}
                </Link>
                ))}
            </div>
            </div>
        </div>
        </footer>

    );
};

export default Footer;