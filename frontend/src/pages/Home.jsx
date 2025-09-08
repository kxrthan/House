import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import heroBg from '../Images/main.png';
import logo from '../Images/logo.png';
import residency1 from '../Images/Residencies/residency1.jpeg';
import residency2 from '../Images/Residencies/Residency2.jpeg';
import residency3 from '../Images/Residencies/residency3.jpeg';

const Home = () => {
  const [hideHeroText, setHideHeroText] = useState(false);
  const [showResidential, setShowResidential] = useState(false);
  const [showCommercial, setShowCommercial] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const galleryRef = useRef(null);
  const [showTopNavbar, setShowTopNavbar] = useState(true);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const isMobile = window.innerWidth <= 768;
      const scrollAmount = isMobile ? 296 : 400; // 280px image + 16px gap
      const currentScroll = galleryRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      galleryRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        updateScrollButtons();
      }, 300);
    }
  };

  const updateScrollButtons = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      
      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  const residentialImages = [
    { src: residency1, title: "Modern Residential Design 1" },
    { src: residency2, title: "Modern Residential Design 2" },
    { src: residency3, title: "Modern Residential Design 3" },
    { src: residency1, title: "Modern Residential Design 4" },
    { src: residency2, title: "Modern Residential Design 5" },
    { src: residency3, title: "Modern Residential Design 6" }
  ];

  const commercialImages = [
    { src: residency1, title: "Office Complex Design 1" },
    { src: residency2, title: "Retail Space Design 2" },
    { src: residency3, title: "Corporate Building 3" },
    { src: residency1, title: "Shopping Center 4" },
    { src: residency2, title: "Business Plaza 5" },
    { src: residency3, title: "Commercial Tower 6" }
  ];

  const schoolImages = [
    { src: residency1, title: "Elementary School Design 1" },
    { src: residency2, title: "High School Campus 2" },
    { src: residency3, title: "University Building 3" },
    { src: residency1, title: "Library Complex 4" },
    { src: residency2, title: "Research Center 5" },
    { src: residency3, title: "Educational Facility 6" }
  ];

  const interiorImages = [
    { src: residency1, title: "Modern Living Room 1" },
    { src: residency2, title: "Contemporary Kitchen 2" },
    { src: residency3, title: "Luxury Bedroom 3" },
    { src: residency1, title: "Office Interior 4" },
    { src: residency2, title: "Restaurant Design 5" },
    { src: residency3, title: "Hotel Lobby 6" }
  ];

  // Initialize scroll button states when any gallery opens
  useEffect(() => {
    if (showResidential || showCommercial || showSchool || showInterior) {
      setTimeout(() => {
        updateScrollButtons();
      }, 100);
    }
  }, [showResidential, showCommercial, showSchool, showInterior]);

  // Show navbar only while on hero (dark) section; hide when white content begins
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight; // hero takes full viewport height
      setShowTopNavbar(window.scrollY < heroHeight - 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Function to render gallery
  const renderGallery = (title, images, onClose) => (
    <section className="relative w-full max-w-7xl mx-auto px-8">
      {/* Back Arrow - Top Right - Desktop Only */}
      <div className="absolute top-8 right-8 z-20" style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300 font-light transition-colors duration-200 drop-shadow-lg bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center"
          style={{ 
            fontSize: '2.25rem',
            width: '64px',
            height: '64px'
          }}
          aria-label="Go back"
        >
          ✕
        </button>
      </div>

      {/* Section Header - Top Center */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center justify-center">
          {canScrollLeft && (
            <button 
              onClick={() => scrollGallery('left')}
              className="text-white hover:text-gray-300 font-light transition-colors duration-200 drop-shadow-lg"
              style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', marginRight: window.innerWidth <= 768 ? '16px' : '32px' }}
              aria-label="Previous images"
            >
              ‹
            </button>
          )}
          <h2 className="font-light text-white tracking-wide drop-shadow-lg" style={{ fontSize: window.innerWidth <= 768 ? '2.5rem' : '3.75rem' }}>{title}</h2>
          {canScrollRight && (
            <button 
              onClick={() => scrollGallery('right')}
              className="text-white hover:text-gray-300 font-light transition-colors duration-200 drop-shadow-lg"
              style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', marginLeft: window.innerWidth <= 768 ? '16px' : '32px' }}
              aria-label="Next images"
            >
              ›
            </button>
          )}
        </div>
      </div>


      
      {/* Horizontal Scrollable Gallery - Center of screen */}
      <div className="relative mt-32">
        <div 
          ref={galleryRef}
          className="flex overflow-x-auto scrollbar-hide py-8"
          style={{
            gap: window.innerWidth <= 768 ? '16px' : '32px',
            padding: window.innerWidth <= 768 ? '0 calc(50vw - 148px)' : '0 16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
            scrollSnapType: window.innerWidth <= 768 ? 'x mandatory' : 'none'
          }}
          onScroll={updateScrollButtons}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0 group cursor-pointer"
              style={{ 
                minWidth: window.innerWidth <= 768 ? '280px' : '400px', 
                maxWidth: window.innerWidth <= 768 ? '280px' : '400px',
                scrollSnapAlign: window.innerWidth <= 768 ? 'center' : 'none'
              }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full object-cover"
                  style={{ height: window.innerWidth <= 768 ? '200px' : '320px' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-medium">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicators - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-center space-x-3">
          {images.map((_, index) => (
            <div 
              key={index}
              className="w-3 h-3 bg-white/60 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer"
            ></div>
          ))}
        </div>
      </div>

      {/* Close Button - Mobile Only - At Very Bottom */}
      {window.innerWidth <= 768 && (
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)' }}>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 font-light transition-colors duration-200 drop-shadow-lg bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center"
            style={{ 
              fontSize: '1.5rem',
              width: '48px',
              height: '48px'
            }}
            aria-label="Go back"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );

  return (
    <div className="relative min-h-screen">
      {/* Full-screen hero background */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          backgroundImage: `url(${heroBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 1,
          filter: (showResidential || showCommercial || showSchool || showInterior) ? 'blur(8px)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/30" style={{ zIndex: 2 }} />
      
      {/* Navbar overlay - visible only over hero (dark) area */}
      {showTopNavbar && (
        <div style={{ position: 'relative', zIndex: 1001 }}>
          <Navbar 
          onDropdownToggle={(isOpen) => {
            setHideHeroText(isOpen);
          }}
          onResidentialClick={() => {
            setShowResidential(true);
            setShowCommercial(false);
            setShowSchool(false);
            setShowInterior(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onCommercialClick={() => {
            setShowCommercial(true);
            setShowResidential(false);
            setShowSchool(false);
            setShowInterior(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSchoolClick={() => {
            setShowSchool(true);
            setShowResidential(false);
            setShowCommercial(false);
            setShowInterior(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onInteriorClick={() => {
            setShowInterior(true);
            setShowResidential(false);
            setShowCommercial(false);
            setShowSchool(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          showOnlyLogo={showResidential || showCommercial || showSchool || showInterior}
          />
        </div>
      )}
      
      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 1000, display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        {!(showResidential || showCommercial || showSchool || showInterior) ? (
          <div className="container mx-auto px-4">
            <h1 className="text-white text-4xl sm:text-6xl font-extrabold max-w-4xl" style={{ marginLeft: '40px' }}>
              "WE DESIGN EXPERIENCES, WHERE EVERY DETAIL SHAPES HOW YOU FEEL"
            </h1>
          </div>
        ) : (
          <>
            {showResidential && renderGallery("RESIDENTIAL", residentialImages, () => {
              setShowResidential(false);
              setShowCommercial(false);
              setShowSchool(false);
              setShowInterior(false);
            })}
            {showCommercial && renderGallery("COMMERCIAL", commercialImages, () => {
              setShowResidential(false);
              setShowCommercial(false);
              setShowSchool(false);
              setShowInterior(false);
            })}
            {showSchool && renderGallery("SCHOOL", schoolImages, () => {
              setShowResidential(false);
              setShowCommercial(false);
              setShowSchool(false);
              setShowInterior(false);
            })}
            {showInterior && renderGallery("INTERIOR", interiorImages, () => {
              setShowResidential(false);
              setShowCommercial(false);
              setShowSchool(false);
              setShowInterior(false);
            })}
          </>
        )}
      </div>
      
      {/* Scrollable content below hero */}
      <div className="relative z-10 bg-white">
        <div id="top" className="h-0" />
        


        <section id="about" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-4" style={{ padding: window.innerWidth <= 768 ? '0 24px' : '0 16px' }}>
            {/* About Us heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 mt-8">
                Designing spaces that inspire, blending creativity and functionality<br/>
                to bring visions to life.
              </p>
              {/* Banner image below heading */}
              <div className="mb-12 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80"
                  alt="Modern interior design"
                  className="w-full h-44 sm:h-56 md:h-72 object-cover"
                />
              </div>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We craft thoughtful, human-centered architecture across residential, commercial, and educational spaces. 
                    Our process blends context, craft, and technology to deliver designs that shape how you feel every day.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    At MOE (Micro Office Engineering), we believe that great architecture is not just about buildings—it's about 
                    creating environments that inspire, comfort, and enhance the human experience.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Approach</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Collaborative design process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Sustainable and innovative solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Attention to detail and craftsmanship</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Client-focused project delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="contact" className="bg-white py-20">
          <div className="container mx-auto" style={{ padding: window.innerWidth <= 768 ? '0 24px' : '0 16px' }}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Get In Touch</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ready to start your next project? We'd love to hear from you and discuss how we can bring your vision to life.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Illustration */}
                <div className="rounded-lg overflow-hidden bg-gray-100">
                  <img src={heroBg} alt="Contact" className="w-full h-full object-cover" />
                </div>
                
                {/* Contact Form */}
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>School</option>
                        <option>Interior Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <button type="submit" className="w-full text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium" style={{backgroundColor: '#1f1f1f'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#0f0f0f'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1f1f1f'}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer - Styled like the provided reference */}
      <footer className="bg-[#1f1f1f] text-gray-200 py-14" style={{ position: 'relative', zIndex: 1000 }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand + Address */}
            <div>
              <div className="flex items-center mb-6">
                <img src={logo} alt="MOE" className="h-9 w-auto mr-3" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-semibold">Address:</div>
                <div>70 MacDougal St, New York, 10012,</div>
                <div>United States</div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Projects</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-white" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Residential</a></li>
                <li><a className="hover:text-white" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Commercial</a></li>
                <li><a className="hover:text-white" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>School</a></li>
                <li><a className="hover:text-white" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Interior Design</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-white" href="#about">About Us</a></li>
                <li><a className="hover:text-white" href="#">Terms of Service</a></li>
                <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Social Media</h4>
              <div className="grid grid-cols-4 gap-3 w-max">
                <a href="#" className="bg-[#3b5998] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">f</span></a>
                <a href="#" className="bg-[#E1306C] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">◎</span></a>
                <a href="#" className="bg-[#000000] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">🐦</span></a>
                <a href="#" className="bg-[#FF0000] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">▶</span></a>
                <a href="#" className="bg-[#0e76a8] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">in</span></a>
                <a href="#" className="bg-[#ff7f50] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">💬</span></a>
                <a href="#" className="bg-[#8B2F17] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">✎</span></a>
                <a href="#" className="bg-[#FF0000] w-12 h-12 rounded-md flex items-center justify-center hover:opacity-90"><span className="text-white text-xl">◉</span></a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 MOE (Micro Office Engineering). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
