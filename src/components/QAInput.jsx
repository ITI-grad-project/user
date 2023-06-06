export default function QAInput({ placeholder, register, errorMessage }) {
  return (
    <div>
      <div className="form-control pt-2">
        <textarea
          name="comment"
          className={`textarea textarea-bordered focus:outline-none min-h-[8rem] text-base`}
          placeholder={`${placeholder}`}
          {...register}
        ></textarea>
        <span className="text-red-700 text-sm">{errorMessage}</span>
      </div>
      <div className="flex items-end justify-end mt-2">
        <button
          type="submit"
          className="btn btn-primary normal-case text-white w-[9rem]"
        >
          Post
        </button>
      </div>
    </div>
  );
}
