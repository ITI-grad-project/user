import { Link, NavLink } from "react-router-dom";

function Footer({ listOfCategories }) {
  return (
    <>
      <footer className="footer p-10 bg-secondary text-white justify-around mt-12">
        <div>
          <span className="footer-title">Categories</span>
          {listOfCategories?.map((category) => {
            return (
              <NavLink
                to={`shop/${category._id}`}
                className={({ isActive }) =>
                  isActive
                    ? "link link-hover capitalize text-primary"
                    : "link link-hover capitalize"
                }
              >
                {category.name}
              </NavLink>
            );
          })}
        </div>
        <div>
          <span className="footer-title">Company</span>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "link link-hover capitalize text-primary"
                : "link link-hover capitalize"
            }
          >
            About us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "link link-hover capitalize text-primary"
                : "link link-hover capitalize"
            }
          >
            Contact Us
          </NavLink>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <h2 className="text-white text-base uppercase">Contact Us</h2>
          <p className="text-sm text-gray-400 mt-1">
            If you have any question. Please
            <br /> contact us at{" "}
            <a
              href="mailto:myrefurb87@gmail.com"
              className="text-primary hover:underline"
            >
              myrefurb87@gmail.com
            </a>{" "}
          </p>
          <div className="mt-1 flex gap-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-400">
              Your Address goes here.
              <br />
              123 , Address.
            </p>
          </div>
          <div className="mt-1 flex gap-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-400 self-center">
              <p>+0 123 456 789</p>
              <p>+0 123 456 789</p>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-secondary text-white border-base-300">
        <div className="items-center grid-flow-col">
          <div>
            <i className="far fa-copyright"></i>
          </div>
          <p>
            Copyright 2023 <span className="font-semibold">MYreFuRB</span>. All
            Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
