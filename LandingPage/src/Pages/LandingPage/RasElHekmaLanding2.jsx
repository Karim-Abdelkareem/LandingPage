import React, { useState } from 'react';

export default function RasElHekmaLanding() {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+20',
    phone: '',
    interest: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    interest: ''
  });

  const countries = [
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+218', name: 'Libya', flag: '🇱🇾' },
    { code: '+249', name: 'Sudan', flag: '🇸🇩' },
    { code: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: '+963', name: 'Syria', flag: '🇸🇾' },
    { code: '+970', name: 'Palestine', flag: '🇵🇸' },
    { code: '+967', name: 'Yemen', flag: '🇾🇪' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' }
  ];
  const [submittedData, setSubmittedData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name Required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "The name must be more than two letters";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10';
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must contain numbers only';
    }
    
    if (!formData.interest) {
      newErrors.interest = "Please select the type of interest";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
          const submissionData = {
        id: Date.now(), 
        name: formData.name,
        countryCode: formData.countryCode,
        phone: formData.phone,
        fullPhone: formData.countryCode + formData.phone, 
        interest: formData.interest,
        submittedAt: new Date().toISOString(), 
        submittedDate: new Date().toLocaleDateString(), 
        submittedTime: new Date().toLocaleTimeString() 
      };
      setSubmittedData(prev => [...prev, submissionData]);
      
      console.log('New Submission:', submissionData);
      console.log('All Submissions:', [...submittedData, submissionData]);
      setShowMessage(true);
      setFormData({ name: '', countryCode: '+20', phone: '', interest: '' });
      setErrors({ name: '', phone: '', interest: '' });
    }
  };

  return (
    <div className="bg-gray-100 font-sans">
    <header className="min-h-screen bg-[url(/public/modon-and-elsewedy-industrial-development-collaborate-to-launch-industrial-zone-for-ras-el-hekma-egypt.webp)] bg-cover bg-center flex items-center justify-center text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">RAS EL HEKMA BY MODON</h1>
          <p className="text-lg md:text-xl mb-6">Join the future of luxury living and investment on Egypt's stunning Mediterranean coast.</p>
          <a href="#signup" className="bg-yellow-400 text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition">Sign Up Now</a>
        </div>
      </header>

 <section className=" relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-teal-500 bg-opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-black rounded-2xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="aspect-video relative">
                <video 
                  className="w-full h-full object-cover rounded-2xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/public/IMG_0326.MOV" type="video/mp4" />
                  
                
                </video>
                
          
           
             
                 </div>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2">Ras El Hekma: Egypt's New Riviera</h3>
                <p className="text-blue-200 mb-4">Discover luxury living, world-class amenities, and unprecedented investment opportunities on the Mediterranean coast.</p>
                <div className="flex items-center space-x-6 text-sm">
               
                  
                </div>
              </div>
            </div>
            
            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center text-white">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2M</div>
                <div className="text-sm text-blue-200">Permanent Residents</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold text-yellow-400 mb-2">3,000</div>
                <div className="text-sm text-blue-200">Marina Berths</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold text-yellow-400 mb-2">7</div>
                <div className="text-sm text-blue-200">Luxury Hotels</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2045</div>
                <div className="text-sm text-blue-200">Full Completion</div>
              </div>
            </div>
          </div>
        </div>
        
       
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Ras El Hekma?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Unmatched Investment Potential</h3>
              <p>With $110 billion in projected investments by 2045, Ras El Hekma offers unparalleled opportunities for investors and businesses.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Luxury & Sustainability</h3>
              <p>Experience a smart, sustainable urban community with over 40km of green spines, luxury hotels, and world-class amenities.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Global Connectivity</h3>
              <p>Located within a 4-hour flight of 400 million tourists, with an international airport and high-speed rail to Cairo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Phase 1: Wadi Yemm</h2>
          <p className="text-center mb-6">Discover the ultra-luxury beginning of Ras El Hekma, designed to rival global destinations like Barcelona and Nice.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Masterplan Design: Broadway Malyan</li>
                <li>Unit Design (Chalets & Villas): AEDAS</li>
                <li>Total Area: 2,000 Feddan</li>
                <li>Units in First Release:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Standalone Villas (500-1,000 sqm, 5-6 bedrooms)</li>
                    <li>Apartments (Beach Residences)</li>
                  </ul>
                </li>
                <li>Product: Ultra Luxury</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Facilities & Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sports Club</li>
                <li>Equestrian Club</li>
                <li>International Theater (10,000 seats)</li>
                <li>Community Center</li>
                <li>7 Hotels (1,000 rooms, featuring global brands new to Egypt)</li>
                <li>2 Golf Courses</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 mt-6">Unique Location</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Built on natural cliffs elevated 20-30 meters above sea level</li>
                <li>Spans 44 km of coastline</li>
                <li>Largest marina in the world (3,000 berths) with cruise ship terminals</li>
                <li>International Airport, High-Speed Train Station, International Marina, Water Taxi</li>
              </ul>
              <h3 className="text-xl font-semibold mb-4 mt-6">Year-Round Destination</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>2 million permanent residents</li>
                <li>2.5 million annual visitors</li>
                <li>Free Zone and Financial Center similar to DIFC (Dubai) and AGM</li>
              </ul>
              <p className="mt-4 italic">Note: Ras El Hekma is not a typical North Coast compound—it's comparable to cities like Barcelona, Nice, or the Turkish Riviera.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="signup" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Be Part of the Future</h2>
          <p className="text-center mb-8">Sign up to receive exclusive updates, investment opportunities, and early access to Ras El Hekma developments.</p>
          <div className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Enter your name" 
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex gap-2">
                  <select 
                    name="countryCode" 
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg w-32" 
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                        e.preventDefault();
                      }
                    }}
                    maxLength="15"
                    className={`flex-1 p-2 border rounded-lg ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Enter your phone number" 
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">Interest</label>
                <select 
                  id="interest" 
                  name="interest" 
                  value={formData.interest}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${errors.interest ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="" disabled>Select your interest</option>
                  <option value="investment">Investment Opportunities</option>
                  <option value="residence">Residential Properties</option>
                  <option value="business">Business & Commercial</option>
                </select>
                {errors.interest && (
                  <p className="text-red-500 text-sm mt-1">{errors.interest}</p>
                )}
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
              >
                Submit
              </button>
            </div>
             {showMessage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
                  <div className="text-green-500 text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                  <p className="text-gray-700 mb-4">Thank you for signing up! We'll be in touch soon with exclusive updates and opportunities.</p>
                  <button 
                    onClick={() => setShowMessage(false)}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Modon Holding. All rights reserved.</p>
          <p className="mt-2">Learn more at <a href="https://modon.com" className="underline hover:text-yellow-400">modon.com</a></p>
        </div>
      </footer>
    </div>
  );
}