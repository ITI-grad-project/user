import { useForm } from "react-hook-form";
const Personallnfo = ({ LoggedUser }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h3 className="text-[20px] text-primary font-[600] mb-5">
          Personal Information
        </h3>
        <svg
          viewBox="0 0 24 24"
          fill="primary"
          height="1.2em"
          width="1.2em"
          className="text-primary"
        >
          <path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z" />
        </svg>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-16">
          <div>
            <p className="font-[600] mb-2 text-[15px]">First Name</p>
            <input
              {...register("firstName", { required: true, maxLength: 20 })}
              className="border-2 rounded px-8 py-1"
            />
          </div>
          <div>
            <p className="font-[600] mb-2 text-[15px]">Last Name</p>
            <input
              {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
              className="border-2 rounded px-8 py-1"
            />
          </div>
        </div>
        <div className="flex gap-16 my-5">
          <div>
            <p className="font-[600] mb-2 text-[15px]">Email</p>
            <input
              {...register("email", { required: true })}
              className="border-2 rounded px-8 py-1"
              value={LoggedUser.email || ""}
            />
          </div>
          <div>
            <p className="font-[600] mb-2 text-[15px]">Phone Number</p>
            <input
              {...register("phone", { min: 11 })}
              className="border-2 rounded px-8 py-1"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <p className="font-[600] mb-2 text-[15px]">Gender</p>
          <input
            type="radio"
            name="radio-4"
            {...register("gender", { required: true })}
            className="radio radio-primary h-5 w-5"
            checked
          />
          Male
          <input
            type="radio"
            name="radio-4"
            {...register("gender", { required: true })}
            className="radio radio-primary h-5 w-5"
            defaultChecked
          />
          Female
        </div>

        {/* <input type="number" {...register("age", { min: 18, max: 99 })} /> */}
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
};

export default Personallnfo;
