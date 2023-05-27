import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  // console.log("category from card", category);
  return (
    <>
      <Link className="card card-compact w-48 bg-base-100 shadow-xl">
        <figure>
          <img
            className="rounded-xl max-h-48"
            src={`${category.image}`}
            alt={`${category.name}`}
          />
        </figure>
        <div className="card-body">
          <div className="btn-primary text-center rounded-lg flex justify-center items-center">
            <h2 className="card-title text-base text-white capitalize">
              {category.name}
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CategoryCard;
