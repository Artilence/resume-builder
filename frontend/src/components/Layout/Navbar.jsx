import { Link } from 'react-router';
import Logo from '../../assets/rb-logo.png';
const Navbar = () => {
  return (
    <div className="w-full gap-5 flex align-center  jusify-between items-center py-2 px-8 shadow-md">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-[70px] object-contain " />
      </Link>
      <Link
        to="/createprofile"
        className="bg-blue-500 text-white px-5 py-4 h-[max-content] rounded-md flex items-center"
      >
        Create Profile
      </Link>
      <Link
        to="/selectprofile"
        className="bg-blue-500 text-white px-5 py-4 h-[max-content] rounded-md flex items-center"
      >
        Select Profile
      </Link>
      <Link
        to="/previewresume"
        className="bg-blue-500 text-white px-5 py-4 h-[max-content] rounded-md flex items-center"
      >
        Preview Resume
      </Link>
    </div>
  );
};

export default Navbar;
