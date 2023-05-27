import { Link, NavLink } from "react-router-dom";

function NavBar({ listOfCategories }) {
  // console.log("List of categories from navbar", listOfCategories.data);
  return (
    <>
      <header className="navbar flex-col sm:flex-row ">
        <div className="navbar-start mx-0 sm:ml-28 ">
          <div className="dropdown self-start">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "bg-primary" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "bg-primary " : "")}
                >
                  About
                </NavLink>
              </li>
              <li tabIndex={0}>
                <a
                  className={({ isActive }) => (isActive ? "bg-primary " : "")}
                >
                  Shop
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2 z-10 bg-white">
                  <li>
                    <NavLink
                      to="/shop"
                      className={({ isActive }) =>
                        isActive ? "bg-primary capitalize" : "capitalize"
                      }
                    >
                      All
                    </NavLink>
                  </li>
                  {listOfCategories?.map((category) => {
                    return (
                      <li>
                        <NavLink
                          to="/shop"
                          className={({ isActive }) =>
                            isActive ? "bg-primary capitalize" : "capitalize"
                          }
                        >
                          {category.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "bg-primary " : "")}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            MYReFurB
          </Link>
        </div>
        <div className="navbar-center ">
          <div className="form-control relative w-96">
            <input
              type="text"
              placeholder="Search for items..."
              className="input input-bordered input-primary"
            />
            <div className="btn-primary rounded-lg p-3 absolute right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white font-semibold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="navbar-end flex gap-4 mx-auto mt-3 sm:mr-28 ">
          <NavLink
            to="/favourite"
            className={({ isActive }) =>
              isActive ? "text-primary text-2xl" : "hover:text-primary text-2xl"
            }
          >
            <i class="far fa-heart"></i>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-primary text-2xl" : "hover:text-primary text-2xl"
            }
          >
            <i class="fas fa-shopping-bag"></i>
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "text-primary text-2xl" : "hover:text-primary text-2xl"
            }
          >
            <i class="far fa-user"></i>
          </NavLink>
          <a className="btn btn-outline btn-md btn-primary w-40 text-base">
            SELL PRODUCT
          </a>
        </div>
      </header>
      <header>
        <div className=" hidden lg:flex border-t border-base-300 justify-center py-2">
          <ul className="menu menu-horizontal px-1 text-base gap-2 menu-compact">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "bg-primary" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "bg-primary " : "")}
              >
                About
              </NavLink>
            </li>
            <li tabIndex={0}>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? "bg-primary " : "")}
              >
                Shop
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </NavLink>
              <ul className="p-2 z-10 bg-white">
                {listOfCategories?.map((category) => {
                  return (
                    <li>
                      <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                          isActive ? "bg-primary capitalize" : "capitalize"
                        }
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>
            {listOfCategories?.map((category) => {
              return (
                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive ? "bg-primary capitalize" : "capitalize"
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "bg-primary " : "")}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default NavBar;
