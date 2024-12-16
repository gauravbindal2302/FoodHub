export default function Navbar() {
  return (
    <>
      <div className="navbar bg-black h-24 w-screen flex items-center justify-between">
        <div className="logo">
          <span className="text-white">FoodHub</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search Products here..." />
        </div>
        <div className="login-register">
          <span className="text-white">Login/Register</span>
        </div>
      </div>
    </>
  );
}
