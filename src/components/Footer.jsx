function Footer() {
  return (
    <>
      <div className="bg-secondary  h-[566] py-[50px]">
        <div className="flex  mx-[120px]  justify-between">
          <div className="flex gap-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[75px] h-[72px] text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>
            </div>
            <div className="self-center">
              <h2 className="text-white text-[24px]">
                Newsletter & Get Updates
              </h2>
              <p className="text-gray-400 text-[16px]">
                Sign up for our newsletter to get update from us
              </p>
            </div>
          </div>
          <div className="self-center w-fit relative ">
            <input
              type="text"
              placeholder="Enter Your Mail Here..."
              className="input sm:w-[200px] md:w-[350px] lg:w-[490px] xl:w-[590px] bg-gray-700"
            />
            <button className="btn  absolute right-0 text-primary btn-accent hover:btn-secondary hover:text-white">
              SUBMIT
            </button>
          </div>
        </div>
        <hr className="mt-[50px] w-full max-w-[1578px]  mx-auto" />
        <div className="my-[50px] mx-[120px] flex justify-between">
          <div>
            <h2 className="text-white text-[24px]">Information</h2>
            <ul className="text-gray-400">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-[24px]">Account</h2>
            <ul className="text-gray-400">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-[24px]">Store</h2>
            <ul className="text-gray-400">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
            </ul>
          </div>
          <div className="border-l border-gray-500 h-[253px]"></div>
          <div>
            <h2 className="text-white text-[24px]">Contact Us</h2>
            <p className="text-[16px] text-gray-400 mt-[16px]">
              If you have any question. Please
              <br /> contact us at{" "}
              <a href="mailto:demo@example.com">demo@example.com</a>{" "}
            </p>
            <div className="mt-[16px] flex gap-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[46px] h-[46px] text-white"
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
              <p className="text-[16px] text-gray-400">
                Your Address goes here.
                <br />
                123 , Address.
              </p>
            </div>
            <div className="mt-[16px] flex gap-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[46px] h-[46px] text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </div>
              <div className="text-[16px] text-gray-400 self-center">
                <p>+0 123 456 789</p>
                <p>+0 123 456 789</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-[50px] w-full max-w-[1800px]  mx-auto" />
        <div className="mx-[120px]">
          <p className="text-[16px] text-gray-400">
            &copy; 2023 <span className="font-bold">OLX</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
