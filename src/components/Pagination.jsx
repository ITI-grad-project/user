import { Pagination } from "antd";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
const PaginationPage = ({ setCurrentPage }) => {
  const onChange = (page) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   function NumberOfPages() {
  //     for (let i = 1; i <= NoOfPages; i++) {
  //       PageNo.push(i);
  //     }
  //   }
  //   NumberOfPages();
  // });

  // const PageNo = Array(NoOfPages)
  //   .fill(0)
  //   .map((item, i) => i + 1);

  // console.log(PageNo);
  // console.log(NoOfPages);
  return (
    <div className="flex flex-wrap  gap-1 items-center justify-center bg-white py-3 sm:px-6 ">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: "#933d24",
            },
          },
        }}
      >
        <Pagination
          defaultCurrent={1}
          onChange={onChange}
          total={50}
          className="PaginationDesign"
        />
      </ConfigProvider>
      {/* {PageNo.length > 1 && (
        <div>
          {PageNo.map((page) => (
            <button
              className="border-2 py-2 mt-5 px-4 text-center rounded hover:border-transparent hover:text-white hover:bg-primary"
              onClick={() => {
                console.log("before", page);
                setCurrentPage(page);
                console.log("after", page);
              }}
              key={page}
            >
              <h2>{page}</h2>
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default PaginationPage;
