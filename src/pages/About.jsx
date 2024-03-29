import React from "react";
import FeatureCard from "../components/FeatureCard";

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl uppercase text-center">About</h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="mx-2 sm:mx-10 md:mx-32 mt-2 sm:mt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          <div className="relative mt-9 ">
            <div className="border-2 border-dashed border-primary rounded-full  h-80 w-80"></div>
            <div className=" absolute inset-0 w-72 h-72 rounded-full overflow-hidden border border-primary  ">
              <img
                className="w-full h-full object-cover  "
                src="/images/image 1.png"
                alt="Your Image"
              />
            </div>
          </div>
          <div className="justify-self-start">
            <h1 className="font-bold">Our Stories</h1>
            <p>
              We aim to create a trusted online marketplace where individuals
              can easily list their used items and connect with potential
              buyers. By facilitating the reuse and recycling of pre-owned
              goods.
            </p>
            <div className="flex gap-9 mt-10 ">
              <pre>
                <h1 className="w-fit mt-9 ">Our Vision</h1>
              </pre>

              <p>
                Our vision is to become the leading ecommerce platform for
                buying and selling used items. We aspire to build a vibrant
                online community where individuals can effortlessly discover,
                trade, and connect with others who share a passion for
                sustainable living and cost-effective shopping.
              </p>
            </div>
            <div className="flex gap-9 mt-10 ">
              <pre>
                <h1 className="w-fit mt-9 ">Our Mission</h1>
              </pre>

              <p>
                Our mission is to provide a reliable and convenient platform for
                buying and selling used items. We aim to create a trusted online
                marketplace where individuals can easily list their used items
                and connect with potential buyers. Our mission is to empower
                individuals to unlock the value in their possessions while
                offering affordable and quality second-hand products to our
                customers.
              </p>
            </div>
          </div>
        </div>
        <div className="m-16 mt-24 mb-24">
          {" "}
          <FeatureCard />
        </div>
        <h1 className="text-center font-bold text-3xl m-10">Team Members</h1>
        <div className="flex flex-col md:flex-row gap-7 justify-center items-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <div className=" w-40 h-40 rounded-full overflow-hidden border border-primary">
                <img
                  className="w-full h-full object-cover  "
                  src="/images/rania.jpeg"
                  alt="Your Image"
                />
              </div>
              <h5 className="mb-1 text-xl mt-5 font-medium text-gray-900 ">
                Rania Atef{" "}
              </h5>
              <span className="text-sm text-gray-500 ">Frontend Developer</span>
              <div className="flex mt-2 space-x-3 md:mt-4">
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-twitter"></i>
                </span>
                <a
                  href="https://www.linkedin.com/in/raniaatefali"
                  className="hover:text-primary"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <div className=" w-40 h-40 rounded-full overflow-hidden border border-primary">
                <img
                  className="w-full h-full object-cover  "
                  src="/images/menna (2).jpeg"
                  alt="Your Image"
                />
              </div>
              <h5 className="mb-1  mt-5 text-xl font-medium text-gray-900 ">
                Mennat allah Kamal
              </h5>
              <span className="text-sm text-gray-500 ">Frontend Developer</span>
              <div className="flex mt-2 space-x-3 md:mt-4">
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-twitter"></i>
                </span>
                <a
                  href="https://www.linkedin.com/in/mennat-allah-kamal-0958a7174"
                  className="hover:text-primary"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <div className=" w-40 h-40 rounded-full overflow-hidden border border-primary">
                <img
                  className="w-full h-full object-cover  "
                  src="/images/fatma.jpeg"
                  alt="Your Image"
                />
              </div>
              <h5 className="mb-1  mt-5 text-xl font-medium text-gray-900 ">
                Fatma Elsayed
              </h5>
              <span className="text-sm text-gray-500 ">Frontend Developer</span>
              <div className="flex mt-2 space-x-3 md:mt-4">
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-twitter"></i>
                </span>
                <a
                  href="https://www.linkedin.com/in/fatma-elsayed"
                  className="hover:text-primary"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-32 mt-14 justify-center items-center">
          {/* </div> */}
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <div className=" w-40 h-40 rounded-full overflow-hidden border border-primary">
                <img
                  className="w-full h-full object-cover  "
                  src="/images/beshoy.jpeg"
                  alt="Your Image"
                />
              </div>
              <h5 className="mb-1  mt-5 text-xl font-medium text-gray-900 ">
                Beshoy Osama
              </h5>
              <span className="text-sm text-gray-500 ">Frontend Developer</span>
              <div className="flex mt-2 space-x-3 md:mt-4">
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-twitter"></i>
                </span>
                <a
                  href="https://www.linkedin.com/in/bishoy-wadie"
                  className="hover:text-primary"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <div className=" w-40 h-40 rounded-full overflow-hidden border border-primary">
                <img
                  className="w-full h-full object-cover  "
                  src="/images/yusef.jpeg"
                  alt="Your Image"
                />
              </div>
              <h5 className="mb-1 mt-5 text-xl font-medium text-gray-900 ">
                Youssef Saeed
              </h5>
              <span className="text-sm text-gray-500">Frontend Developer</span>
              <div className="flex mt-2 space-x-3 md:mt-4">
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
                <span className="hover:text-primary hover:cursor-pointer">
                  <i class="fa-brands fa-twitter"></i>
                </span>
                <a
                  href="https://www.linkedin.com/in/youssef-saeed-60aa931a6"
                  className="hover:text-primary"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center font-bold text-3xl m-10">
          What Clients Say
        </h1>

        <div className="carousel carousel-center max-w-md p-4 space-x-4 mx-auto h-80 rounded-box">
          <div className="carousel-item">
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-end text-primary ">
                  <i class="fa-sharp fa-solid fa-quote-right"></i>
                </div>
                <img
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  src="/images/man.jpg"
                  alt="Testimonial Image"
                />

                <h3 className="text-lg font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-600">
                  "Vivamus pretium diam non tortor eleifend tincidunt. Aliquam
                  lobortis, justo nec suscipit tempor."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-end text-primary ">
                  <i class="fa-sharp fa-solid fa-quote-right"></i>
                </div>
                <img
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  src="/images/man.jpg"
                  alt="Testimonial Image"
                />
                <h3 className="text-lg font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-600">
                  "Vivamus pretium diam non tortor eleifend tincidunt. Aliquam
                  lobortis, justo nec suscipit tempor."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-end text-primary ">
                  <i class="fa-sharp fa-solid fa-quote-right"></i>
                </div>
                <img
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  src="/images/man.jpg"
                  alt="Testimonial Image"
                />
                <h3 className="text-lg font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-600">
                  "Vivamus pretium diam non tortor eleifend tincidunt. Aliquam
                  lobortis, justo nec suscipit tempor."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-end text-primary ">
                  <i class="fa-sharp fa-solid fa-quote-right"></i>
                </div>
                <img
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  src="/images/man.jpg"
                  alt="Testimonial Image"
                />
                <h3 className="text-lg font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-600">
                  "Vivamus pretium diam non tortor eleifend tincidunt. Aliquam
                  lobortis, justo nec suscipit tempor."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
