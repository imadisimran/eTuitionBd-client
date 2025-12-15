import React from "react";
import { FaArrowRight, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { longDateFromS } from "../../utilities/formatDate";

const PaymentCard = ({ data }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header: Amount and Date */}
      <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
            Payment
          </p>
          <h3 className="text-xl font-bold text-emerald-600">
            BDT {data.amount}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs shadow-sm">
          <FaCalendarAlt />
          <span>{longDateFromS(data.paidAt)}</span>
        </div>
      </div>

      {/* Body: Sender & Receiver */}
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Student (From)</span>
            <span className="font-medium text-gray-800 truncate max-w-[150px]">
              {data.studentEmail}
            </span>
          </div>

          {/* Visual Divider */}
          <div className="flex justify-center -my-2 relative z-10">
            <span className="bg-gray-100 text-gray-400 p-1 rounded-full text-[10px]">
              <FaArrowRight />
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Tutor (To)</span>
            <span className="font-medium text-gray-800 truncate max-w-[150px]">
              {data.tutorEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Transaction ID */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex items-center gap-2">
        <FaHashtag className="text-gray-400 text-xs" />
        <p
          className="text-[10px] text-gray-400 font-mono truncate w-full"
          title={data.transactionId}
        >
          TransactionID: {data.transactionId}
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
