import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MdOutlineFoodBank } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Meals" },
    { path: "/about", name: "About" },
    { path: "/nutrition", name: "Nutrition" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 lg:p-2 lg:px-36">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold tracking-wide text-[#F17228]"
        >
          <MdOutlineFoodBank /> 
          <span>HOMEMEAL HUB</span>
        </Link>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.path
                  ? "text-[#F17228] border-b-2 border-[#F17228]"
                  : "text-gray-800 hover:text-[#F17228]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-[#FFF1D5] text-[#F17228]"
                    : "text-gray-800 hover:bg-[#FFF1D5]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;