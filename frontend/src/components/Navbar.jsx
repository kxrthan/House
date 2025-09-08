import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';

const Navbar = ({ onDropdownToggle, onResidentialClick, onCommercialClick, onSchoolClick, onInteriorClick, showOnlyLogo = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileProjectsDropdown, setShowMobileProjectsDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = -600;
      const additionalOffset = sectionId === 'contact' ? 200 : 0;
      const elementPosition = element.offsetTop - navbarHeight + additionalOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav style={{ 
      position: 'fixed', 
      top: '10px', 
      width: '100%', 
      backgroundColor: 'transparent', 
      zIndex: 9999,
      pointerEvents: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: isMobile ? '0 24px' : '0 16px',
        display: 'flex',
        alignItems: 'center',
        height: '64px'
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <img 
            src={logo} 
            alt="MOE" 
            style={{ height: '48px', width: 'auto', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
        
        {!showOnlyLogo && (
          <>
          {/* Desktop Menu */}
          <div style={{ 
            flex: '1',
            display: !isMobile ? 'flex' : 'none', 
            justifyContent: 'center',
            alignItems: 'center', 
            gap: '32px'
          }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '12px 16px',
              userSelect: 'none'
            }}
          >
            HOME
          </button>
          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                const newState = !showDropdown;
                setShowDropdown(newState);
                if (onDropdownToggle) onDropdownToggle(newState);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '12px 16px',
                userSelect: 'none'
              }}
            >
              PROJECTS
            </button>
            
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                backgroundColor: 'transparent',
                padding: '8px 0',
                minWidth: '180px',
                marginTop: '8px',
                zIndex: 1001
              }}>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    if (onResidentialClick) {
                      onResidentialClick();
                    }
                  }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'white',
                    marginBottom: '8px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#9ca3af'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  RESIDENTIAL
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    if (onCommercialClick) {
                      onCommercialClick();
                    }
                  }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'white',
                    marginBottom: '8px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#9ca3af'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  COMMERCIAL
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    if (onSchoolClick) {
                      onSchoolClick();
                    }
                  }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'white',
                    marginBottom: '8px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#9ca3af'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  SCHOOL
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    if (onInteriorClick) {
                      onInteriorClick();
                    }
                  }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#9ca3af'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  INTERIOR
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => scrollToSection('about')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '12px 16px',
              userSelect: 'none'
            }}
          >
            ABOUT
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '12px 16px',
              userSelect: 'none'
            }}
          >
            CONTACT
          </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div style={{ marginLeft: 'auto', display: isMobile ? 'block' : 'none' }}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              ☰
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {showMobileMenu && isMobile && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '16px',
              backgroundColor: '#1f1f1f',
              borderRadius: '8px',
              padding: '16px',
              minWidth: '200px',
              zIndex: 1001
            }}>
              <button
                onClick={() => { window.location.href = '/'; setShowMobileMenu(false); }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '12px 0',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                HOME
              </button>
              
              <div style={{ borderTop: '1px solid #333', margin: '8px 0' }}></div>
              
              <div style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => setShowMobileProjectsDropdown(!showMobileProjectsDropdown)}
                  style={{ 
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'white', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    padding: '8px 0',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  PROJECTS {showMobileProjectsDropdown ? '▲' : '▼'}
                </button>
                {showMobileProjectsDropdown && (
                  <>
                    <button
                      onClick={() => { if (onResidentialClick) onResidentialClick(); setShowMobileMenu(false); }}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '13px',
                        padding: '8px 16px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      RESIDENTIAL
                    </button>
                    <button
                      onClick={() => { if (onCommercialClick) onCommercialClick(); setShowMobileMenu(false); }}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '13px',
                        padding: '8px 16px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      COMMERCIAL
                    </button>
                    <button
                      onClick={() => { if (onSchoolClick) onSchoolClick(); setShowMobileMenu(false); }}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '13px',
                        padding: '8px 16px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      SCHOOL
                    </button>
                    <button
                      onClick={() => { if (onInteriorClick) onInteriorClick(); setShowMobileMenu(false); }}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '13px',
                        padding: '8px 16px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      INTERIOR
                    </button>
                  </>
                )}
              </div>
              
              <div style={{ borderTop: '1px solid #333', margin: '8px 0' }}></div>
              
              <button
                onClick={() => { scrollToSection('about'); setShowMobileMenu(false); }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '12px 0',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                ABOUT
              </button>
              
              <button
                onClick={() => { scrollToSection('contact'); setShowMobileMenu(false); }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '12px 0',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                CONTACT
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;