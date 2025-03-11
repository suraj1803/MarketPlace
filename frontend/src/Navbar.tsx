import shoppingLogo from "../assets/trolley.png";
import userLogo from "../assets/profile.png";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-800">
      <div className="p-3 mx-auto max-w-7xl flex justify-between">
        <div>
          <a href="/">
            <div className="flex items-center justify-between gap-2">
              <img
                src={shoppingLogo}
                className="w-10 cursor-pointer hover:opacity-75"
              />
              <p className="text-white font-bold">MarketPlace</p>
            </div>
          </a>
        </div>
        <div>
          <a href="/profile">
            <img
              src={userLogo}
              className="w-10 cursor-pointer hover:opacity-75"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
