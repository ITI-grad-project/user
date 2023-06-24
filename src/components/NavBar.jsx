import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import notify from "../hooks/useNotification";
import Avatar from "./avatar";

function NavBar({
  listOfCategories,
  loginState,
  setLoginState,
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setLoginState(true);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNavigate = () => {
    navigate(`/shop/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoginState(false);
    // window.location.href = "/";
    navigate("/");
  };

  return (
    <>
      <div className="shadow-lg">
        <header className="navbar flex-col lg:flex-row  justify-between items-center ">
          <div className="mb-3 lg:ml-28 lg:mb-0">
            <Link to="/" className=" normal-case text-xl">
              <img
                src="../../public/images/myrefurb.png"
                className="w-32 h-[4.8rem]"
              ></img>
            </Link>
          </div>
          <div>
            <div className="form-control relative w-96 h-fit">
              <>
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input input-bordered input-primary input-sm"
                />
                <div
                  onClick={handleNavigate}
                  className="btn-primary rounded-lg p-2 absolute right-0 hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-white font-semibold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </>
            </div>
          </div>
          <div className=" flex gap-4 justify-between mt-3 sm:mr-28 ">
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
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
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
                    className={({ isActive }) =>
                      isActive ? "bg-primary " : ""
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li tabIndex={0}>
                  <a
                    className={({ isActive }) =>
                      isActive ? "bg-primary " : ""
                    }
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
                  <ul className="p-2 z-10 bg-white border border-base-300 shadow-md">
                    <li>
                      <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                          isActive ? "bg-primary capitalize" : "capitalize"
                        }
                      >
                        Shop
                      </NavLink>
                    </li>
                    {listOfCategories?.map((category) => {
                      return (
                        <li key={category?._id}>
                          <NavLink
                            to={`/shop/${category._id}`}
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
                    className={({ isActive }) =>
                      isActive ? "bg-primary " : ""
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex lg:gap-4">
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  if (loginState !== true) {
                    notify("You must login first", "warn");
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  } else {
                    navigate("/favorite");
                  }
                }}
                to="/favorite"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-2xl"
                    : "hover:text-primary text-2xl"
                }
              >
                <i className="far fa-heart"></i>
              </NavLink>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  if (loginState !== true) {
                    notify("You must login first", "warn");
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  } else {
                    navigate("/cart");
                  }
                }}
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-2xl"
                    : "hover:text-primary text-2xl"
                }
              >
                <i className="fas fa-shopping-bag"></i>
              </NavLink>
            </div>
            <button
              onClick={() => {
                if (loginState !== true) {
                  notify("You must login first", "warn");
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                } else {
                  navigate("/addProduct/add");
                }
              }}
              className="btn btn-outline btn-sm btn-primary w-40 text-base"
            >
              SELL PRODUCT
            </button>
            {loginState != true ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-2xl"
                      : "hover:text-primary text-2xl"
                  }
                >
                  <i className="far fa-user"></i>
                </NavLink>
              </>
            ) : (
              <>
                <div className="flex gap-1">
                  <h1 className="self-center">hello , {user?.userName}</h1>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost hover:btn-primary btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        {user?.profileImg ? (
                          <img
                            src={user?.profileImg}
                            className="w-13 h-11 rounded-full"
                          />
                        ) : (
                          <Avatar></Avatar>
                        )}
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
                    >
                      <li>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive ? "bg-primary" : ""
                          }
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="lg:hidden">
                        <NavLink
                          to="/favorite"
                          className={({ isActive }) =>
                            isActive ? "bg-primary" : ""
                          }
                        >
                          Wishlist
                        </NavLink>
                      </li>
                      <li className="lg:hidden">
                        <NavLink
                          to="/cart"
                          className={({ isActive }) =>
                            isActive ? "bg-primary" : ""
                          }
                        >
                          My Cart
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
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
                </NavLink>
              </li>
              {listOfCategories?.map((category) => {
                return (
                  <li key={category?._id}>
                    <NavLink
                      to={`/shop/${category._id}`}
                      className={({ isActive }) =>
                        isActive ? "bg-primary capitalize " : "capitalize"
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
      </div>
    </>
  );
}

export default NavBar;
