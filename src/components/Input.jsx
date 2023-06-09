export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  register,
  errorMessage,
  disabled,
  editbtn,
}) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text text-base">{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`input input-bordered focus:outline-none  disabled:placeholder-black disabled:bg-white  ${
          errorMessage && "invalid"
        }`}
        {...register}
        {...(editbtn === 0 && (disabled = { disabled }))}
      />
      <span className="text-red-500 text-sm">{errorMessage}</span>
    </div>
  );
}
