import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  console.log(rating);

  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, index) => (
        <i key={index} className="fas fa-star filled text-primary"></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index} className="fas fa-star empty text-gray-400"></i>
      ))}
    </div>
  );
};

export default StarRating;
