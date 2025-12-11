import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PendingTutors = () => {
    const axiosSecure=useAxiosSecure()
    const {data:tutors=[]}=useQuery({
        queryKey:['pending','tutors'],
        queryFn:async()=>{
            const result = await axiosSecure.get('user/tutor?status=pending')
            return result.data
        }
    })
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Institution</th>
              <th>Experience</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor,index)=><tr>
              <th>{index+1}</th>
              <td>{tutor.displayName}</td>
              <td>{tutor.tutorProfile.institution}</td>
              <td>{tutor.tutorProfile.experience}</td>
              <td>{tutor.tutorProfile.gender}</td>
              <td className="space-x-5">
                <button className="btn btn-sm btn-primary">Accept</button>
                <button className="btn btn-sm btn-secondary">Reject</button>
                <button className="btn btn-sm btn-accent">View Details</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTutors;
