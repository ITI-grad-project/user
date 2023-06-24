export default function Avatar({ width, ring, ringPrimary }) {
  return (
    <div className="avatar">
      <div
        className={`${
          width ? `w-[${width}]` : "w-10"
        } rounded-full hover:${ring} hover:${ringPrimary}`}
      >
        <img src="https://www.pngitem.com/pimgs/m/466-4660076_unknown-person-hd-png-download.png" />
      </div>
    </div>
  );
}
