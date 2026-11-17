import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUserShield,
  FaTrashCan,
  FaMagnifyingGlass,
  FaMotorcycle,
  FaUser,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const PAGE_SIZE = 8;

const roleBadge = {
  admin: "badge-primary",
  rider: "badge-secondary",
  user: "badge-ghost",
};

const RoleIcon = ({ role }) => {
  if (role === "admin") return <FaUserShield className="mr-1" />;
  if (role === "rider") return <FaMotorcycle className="mr-1" />;
  return <FaUser className="mr-1" />;
};

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role update mutation
  const roleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/role/${id}`, { role }),
    onSuccess: (res, { name, role }) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `${name} is now a ${role}.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: (res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleRoleChange = (user, newRole) => {
    const currentRole = user.role || "user";
    if (currentRole === newRole) return;
    const name = user.name || user.email;

    Swal.fire({
      title: "Update User Role?",
      text: `Change ${name}'s role to ${newRole.toUpperCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update role",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: user._id, role: newRole, name });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${user.name || user.email}. This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(user._id);
    });
  };

  // Counts
  const counts = useMemo(() => {
    const c = { all: users.length, admin: 0, rider: 0, user: 0 };
    users.forEach((u) => {
      c[u.role || "user"] += 1;
    });
    return c;
  }, [users]);

  // Filter + search
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        (user.name || "").toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term);
      const matchesRole =
        roleFilter === "all" || (user.role || "user") === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const busy = roleMutation.isPending || deleteMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Failed to load users. Please check your login or server.</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-sm">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage platform accounts, assign roles, and control access.
          </p>
        </div>

        <div className="stats shadow bg-base-200">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Total</div>
            <div className="stat-value text-2xl">{counts.all}</div>
          </div>
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Admins</div>
            <div className="stat-value text-2xl text-primary">
              {counts.admin}
            </div>
          </div>
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Riders</div>
            <div className="stat-value text-2xl text-secondary">
              {counts.rider}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <label className="input input-bordered flex items-center gap-2 w-full sm:w-80">
          <FaMagnifyingGlass className="text-base-content/50" />
          <input
            type="text"
            className="grow"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <select
          className="select select-bordered w-full sm:w-52"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Roles ({counts.all})</option>
          <option value="admin">Admin ({counts.admin})</option>
          <option value="rider">Rider ({counts.rider})</option>
          <option value="user">User ({counts.user})</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-base-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Current Role</th>
              <th>Assign Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-base-content/60"
                >
                  No users found matching your criteria.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => {
                const role = user.role || "user";
                return (
                  <tr key={user._id} className="hover">
                    <td className="font-medium">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-9">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.name} />
                            ) : (
                              <span className="text-xs uppercase">
                                {(user.name || user.email || "U").slice(0, 2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-semibold">
                          {user.name || "Unnamed User"}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm">{user.email}</td>
                    <td className="text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`badge font-medium capitalize ${roleBadge[role]}`}
                      >
                        <RoleIcon role={role} />
                        {role}
                      </span>
                    </td>
                    <td>
                      <select
                        className="select select-bordered select-sm w-32 capitalize"
                        value={role}
                        disabled={busy}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="rider">Rider</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDeleteUser(user)}
                        disabled={busy}
                        className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                        title="Delete User"
                      >
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > PAGE_SIZE && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-base-content/60">
            Page {currentPage} of {totalPages} ({filteredUsers.length} users)
          </p>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              «
            </button>
            <button className="join-item btn btn-sm btn-active">
              {currentPage}
            </button>
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
