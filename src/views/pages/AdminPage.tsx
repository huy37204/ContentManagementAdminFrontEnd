import React, { useEffect, useState } from "react";
import { AddUserDto, IUser } from "../../interfaces/user";
import { getAllUsers } from "../../services/User/getAllUsers";
import { updateUser } from "../../services/User/updateUser";
import { createUser } from "../../services/User/createUsers";
import CreateUserModal from "../components/CreateUserModal";

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

  const [showCreateModal, setShowCreateModal] = useState(false);
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

  const handleUpdate = async () => {
    if (!editingUser) return;
    await updateUser(editingUser._id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
    });
    setEditingUser(null);
    fetchUsers();
    resetState();
  };

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
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
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
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-4 py-2">
                {editingUser?._id === u._id ? (
                  <input
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="border px-2"
                  />
                ) : (
                  u.name
                )}
              </td>
              <td className="border px-4 py-2">
                {" "}
                {editingUser?._id === u._id ? (
                  <input
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="border px-2"
                  />
                ) : (
                  u.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUser?._id === u._id ? (
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="border"
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
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditingUser(u)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
