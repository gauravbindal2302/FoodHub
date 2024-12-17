export default function Footer() {
  return (
    <>
      <div className="footer bg-black text-white py-8 px-4 sm:px-12 w-full">
        <div className="container mx-auto flex flex-col sm:flex-row justify-around items-center sm:items-center">
          <div className="footer-links flex items-center space-x-8 text-lg mb-4 sm:mb-0">
            <a href="#about" className="hover:text-blue-400 transition-colors">
              About Us
            </a>
            <a
              href="#services"
              className="hover:text-blue-400 transition-colors"
            >
              Services
            </a>
            <div className="logo text-2xl text-red-200 sm:text-3xl font-bold flex items-center">
              <span>FoodHub</span>
            </div>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
            <a
              href="#privacy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="copyright text-center mt-6">
          <span className="text-sm">
            &copy; 2024 FoodHub. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
}
