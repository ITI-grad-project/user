import { Pagination } from "antd";
import { ConfigProvider } from "antd";
const PaginationPage = ({ setCurrentPage }) => {
  // const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    // console.log(page);
    // setCurrent(page);
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white py-3 sm:px-6 ">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              // colorPrimary: "#933d24",
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
    </div>
  );
};

export default PaginationPage;
