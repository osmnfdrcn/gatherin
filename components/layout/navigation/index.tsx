import SideNav from "./sidenav";
import TopNav from "./topnav";

const Navbar = () => {
  return (
    <>
      <div className="flex md:hidden ">
        <TopNav />
      </div>
      <SideNav />
    </>
  );
};

export default Navbar;
