import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserDetailsModal from "./UserDetailsModal";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user?.photoURL ||
                            "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                          }
                          alt={user?.displayName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.displayName}</div>
                      {user?.role !== "admin" && (
                        <div className="text-sm opacity-50">
                          {user?.percent}%
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {user?.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.role}
                  </span>
                </td>
                <td className="capitalize">{user?.role}</td>
                <th>
                  <button
                    className="btn btn-accent btn-xs"
                    onClick={() =>
                      setSelectedUser({ email: user.email, role: user.role })
                    }
                  >
                    Details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <UserDetailsModal
          userConfig={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
