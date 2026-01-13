import { Star } from "lucide-react";

const StarRating = ({ rating, setRating, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => (
        <Star
          key={star}
          size={20}
          onClick={() => !readonly && setRating(star)}
          className={`cursor-pointer ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
