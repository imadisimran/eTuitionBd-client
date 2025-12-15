import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserDetailsModal from "./UserDetailsModal";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";

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

  const queryClient = useQueryClient();

  const { mutate: deleteFn } = useMutation({
    mutationFn: (email) => {
      return axiosSecure.delete(`/delete-user?email=${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successAlert("Deleted Successfully");
    },
    onError: () => {
      errorAlert();
    },
  });
  const { mutate: roleUpdateFn } = useMutation({
    mutationFn: ({ email, role }) => {
      return axiosSecure.patch(`/user/role?email=${email}`, { role: role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successAlert("Deleted Successfully");
    },
    onError: () => {
      errorAlert();
    },
  });

  const handleDelete = (email) => {
    confirmation(
      "Do you really want to delete the user?",
      "You won't be able to revert it",
      "Yes Delete",
      () => {
        deleteFn(email);
      }
    );
  };

  const handleRoleChange = (role, email) => {
    confirmation(
      `Do you really want to change his role to ${role.toUpperCase()}`,
      `${email} he is going to be ${
        role === "admin" ? "an" : "a"
      } ${role.toUpperCase()}`,
      `Yes Make ${role.toUpperCase()}`,
      () => {
        roleUpdateFn({ role, email });
      }
    );
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Details</th>
              <th>Actions</th>
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
                <td className="space-x-5">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="btn btn-xs btn-secondary"
                  >
                    Delete
                  </button>
                  <select
                    className="select select-xs max-w-20"
                    onChange={(e) =>
                      handleRoleChange(e.target.value, user.email)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
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
