import React, { useEffect, useState } from "react";
import { AddUserDto, IUser } from "../../interfaces/user";
import { getAllUsers } from "../../services/User/getAllUsers";
import { updateUser } from "../../services/User/updateUser";
import { createUser } from "../../services/User/createUsers";
import CreateUserModal from "../components/CreateUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { deleteUser } from "../../services/User/deleteUsers";
import { useAuth } from "../../contexts/AuthContext";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  // Error msg
  const [errorCreateUser, setErrorCreateUser] = useState("");
  const [errorUpdateUser, setErrorUpdateUser] = useState("");
  const [errorDeleteUser, setErrorDeleteUser] = useState("");
  // Is success CRUD
  const [isCreateUserSuccess, setIsCreateUserSuccess] = useState(false);
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);
  const [isDeleteUserSuccess, setIsDeleteUserSuccess] = useState(false);
  // Popup Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Select User
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { id } = useAuth();
  // Reset all state
  const resetState = () => {
    setErrorCreateUser("");
    setErrorUpdateUser("");
    setErrorDeleteUser("");
    setIsCreateUserSuccess(false);
    setIsDeleteUserSuccess(false);
    setIsUpdateUserSuccess(false);
  };
  const fetchUsers = async () => {
    const res = await getAllUsers();
    if ("data" in res) setUsers(res.data);
  };
  // Update User
  const handleUpdate = async () => {
    if (!editingUser) return;
    const response = await updateUser(editingUser._id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
    });
    if ("error" in response) {
      setErrorUpdateUser(response.error);
      return;
    }
    setIsUpdateUserSuccess(true);

    setTimeout(() => {
      setEditingUser(null);
      resetState();
    }, 1000);
    fetchUsers();
  };
  // Create User
  const handleCreate = async (user: AddUserDto) => {
    const response = await createUser(user);
    if ("error" in response) {
      setErrorCreateUser(response.error);
      return;
    }
    setIsCreateUserSuccess(true);
    setTimeout(() => {
      setShowCreateModal(false);
      resetState();
    }, 1000);
    fetchUsers();
  };
  // Delete User
  const handleDelete = async () => {
    if (!selectedUserId) return;
    const response = await deleteUser(selectedUserId);
    if ("error" in response) {
      setErrorDeleteUser(response.error);
      return;
    }
    setIsDeleteUserSuccess(true);
    setTimeout(() => {
      setShowDeletePopup(false);
      resetState();
    }, 1000);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className=" w-full min-w-[370px]">
      <h1 className="text-2xl font-bold mb-4">Admin - User Management</h1>

      {/* Add User */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>
      {isUpdateUserSuccess ? (
        <p className="text-center font-bold text-green-500">
          Update user successfully
        </p>
      ) : (
        errorUpdateUser && (
          <p className="text-center font-bold text-red-500">
            {errorUpdateUser}d
          </p>
        )
      )}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => {
          resetState();
          setShowCreateModal(false);
        }}
        onCreate={handleCreate}
        errorMsg={errorCreateUser}
        isSuccess={isCreateUserSuccess}
      />

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 w-[120px]">ID</th>
              <th className="border px-4 py-2 w-[120px]">Name</th>
              <th className="border px-4 py-2 w-[120px]">Email</th>
              <th className="border px-4 py-2 w-[120px]">Role</th>
              <th className="border px-4 py-2 w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {u._id}
                </td>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {editingUser?._id === u._id ? (
                    <input
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                      className="border p-2 w-full max-w-full truncate"
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {" "}
                  {editingUser?._id === u._id ? (
                    <input
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      className="border p-2 w-full max-w-full truncate"
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="border px-4 py-2 w-[120px]">
                  {editingUser?._id === u._id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                      className="border w-full p-2 max-w-full truncate"
                    >
                      <option value="client">Client</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  {editingUser?._id === u._id ? (
                    <button
                      className="bg-blue-500 text-white py-2 rounded w-[80px]"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      disabled={id === u._id}
                      className={`${
                        id === u._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500"
                      } text-white  py-2 rounded w-[80px]`}
                      onClick={() => setEditingUser(u)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className={`py-2 rounded text-white w-[80px]
                    ${
                      id === u._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={id === u._id}
                    onClick={() => {
                      setSelectedUserId(u._id);
                      setShowDeletePopup(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={showDeletePopup}
        onClose={() => {
          setSelectedUserId(null);
          setShowDeletePopup(false);
          resetState();
        }}
        onConfirm={handleDelete}
        message="Do you really want to delete this user?"
        errorMsg={errorDeleteUser}
        isSuccess={isDeleteUserSuccess}
      />
    </div>
  );
};

export default AdminPage;
