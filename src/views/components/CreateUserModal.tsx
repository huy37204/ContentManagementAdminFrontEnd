import React, { useEffect, useState } from "react";
import { AddUserDto } from "../../interfaces/user";
import { Role } from "../../enums/Role";
import InputField from "./InputFields";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: AddUserDto) => void;
  errorMsg: string;
  isSuccess: boolean;
}

const CreateUserModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
  errorMsg,
  isSuccess,
}) => {
  const [form, setForm] = useState<AddUserDto>({
    name: "",
    email: "",
    password: "",
    role: Role.CLIENT,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (field: keyof AddUserDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", role: Role.CLIENT });
    setConfirmPassword("");
    setFieldErrors({});
  };

  const validate = (): boolean => {
    const errs: typeof fieldErrors = {};

    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!form.email.includes("@")) errs.email = "Invalid email address.";

    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";

    if (!confirmPassword)
      errs.confirmPassword = "Confirm password is required.";
    else if (form.password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onCreate(form);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen]);

  const successMsg = "Create user successfully.";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-6 bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Create New User</h2>

        <InputField
          label="Name"
          type="text"
          value={form.name}
          onChange={(value) => handleChange("name", value)}
          error={fieldErrors.name}
          placeholder="Client name"
        />
        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => handleChange("email", value)}
          error={fieldErrors.email}
          placeholder="client@example.com"
        />
        <InputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => handleChange("password", value)}
          error={fieldErrors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(value) => setConfirmPassword(value)}
          error={fieldErrors.confirmPassword}
        />

        <select
          className="w-full border px-3 py-2 mb-2 rounded"
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value as Role)}
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        {isSuccess ? (
          <span className="font-bold text-green-500 text-[14px]">
            {successMsg}
          </span>
        ) : errorMsg ? (
          <span className="font-bold text-red-500 text-[14px]">{errorMsg}</span>
        ) : null}

        <div className="flex ml-auto gap-2">
          <button onClick={handleClose} className="text-gray-600 px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
