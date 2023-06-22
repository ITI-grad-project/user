export default function Avatar({ width, ring, ringPrimary }) {
  return (
    <div className="avatar">
      <div
        className={`${
          width ? `w-[${width}]` : "w-10"
        } rounded-full hover:${ring} hover:${ringPrimary}`}
      >
        <img src="../../public/images/avatar1.avif" />
      </div>
    </div>
  );
}
