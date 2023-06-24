export default function ConfirmModal({ id, onClick, message }) {
  return (
    <>
      <input
        type="checkbox"
        id={`my_modal_${id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-3xl text-red-600">
            <i className="fa-solid fa-circle-exclamation"></i>
          </h3>
          <h4 className="text-lg font-bold pt-3">
            {message}
          </h4>
          <p className="pt-2">You will not be able to recover it</p>
          <div className="flex justify-center items-center gap-2 modal-action">
            <label
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 cursor-pointer"
            //   onClick={() => handleDeleteQ(question)}
              onClick={onClick}
              htmlFor={`my_modal_${id}`}
            >
              Yes
            </label>
            <label
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 cursor-pointer"
              htmlFor={`my_modal_${id}`}
            >
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
