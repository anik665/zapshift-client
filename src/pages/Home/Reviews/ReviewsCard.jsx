import { FaStar, FaStarAndCrescent } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
  const { userName, review: reviewText, rating, user_photoURL, date } = review;

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body">
        {/* Rating */}
        <div className="flex items-center gap-1 text-warning">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        {/* Review */}
        <p className="text-gray-500 leading-relaxed">"{reviewText}"</p>

        {/* User */}
        <div className="flex items-center gap-4 mt-5">
          <img
            src={user_photoURL}
            alt={userName}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">{userName}</h3>
            <p className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
