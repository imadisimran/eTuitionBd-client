import React from "react";
import { MapPin, Banknote, BookOpen, GraduationCap } from "lucide-react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { formatClass, formatWith_ } from "../../utilities/textFormatter";
import { shortDate } from "../../utilities/formatDate";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  // Destructure the data object
  const {
    title,
    subject,
    class: classGrade,
    medium,
    salaryRange,
    location,
    createdAt,
    _id,
  } = tuition;

  return (
    <div className="card bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300 w-full max-w-md group h-full">
      <div className="card-body p-6 flex flex-col">
        {/* Header: Title & Subject Badge */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <h2 className="card-title text-neutral text-lg font-bold leading-tight">
              {title}
            </h2>
            <p className="text-xs text-neutral/60 font-medium mt-1 uppercase tracking-wide">
              {shortDate(createdAt)}
            </p>
          </div>
          <div className="badge badge-secondary badge-outline font-semibold whitespace-nowrap shrink-0 capitalize">
            {formatWith_(subject)}
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-1"></div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 text-sm text-neutral/80">
          {/* Class & Medium */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="font-medium capitalize">
                {formatClass(classGrade)}
              </span>
            </div>
            <span className="text-base-300">•</span>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="capitalize">{formatWith_(medium)}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral/50" />
            <span className="truncate">{location.district}</span>
          </div>

          {/* Salary (Highlighted) */}
          <div className="flex items-center gap-2 mt-1 p-2 bg-base-200 rounded-lg">
            <Banknote className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">
              {formatCurrency(salaryRange.min)} -{" "}
              {formatCurrency(salaryRange.max)}
              <span className="text-xs font-normal text-neutral/60 ml-1">
                / month
              </span>
            </span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="card-actions justify-end mt-auto">
          <Link
            to={`/tuition/${_id}`}
            className="btn btn-primary btn-sm btn-neo text-white font-bold w-full sm:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;
