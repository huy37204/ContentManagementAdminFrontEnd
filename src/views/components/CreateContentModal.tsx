import React, { useEffect, useState } from "react";
import InputField from "./InputFields";
import { AddContentDto } from "../../interfaces/content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: AddContentDto) => void;
  errorMsg: string;
  isSuccess: boolean;
}

const CreateContentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
  errorMsg,
  isSuccess,
}) => {
  const [form, setForm] = useState<AddContentDto>({
    title: "",
    blocks: [],
  });

  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
  }>({});

  const handleChange = (field: keyof AddContentDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({ title: "", blocks: [] });
    setFieldErrors({});
  };

  const validate = (): boolean => {
    const errs: typeof fieldErrors = {};

    if (!form.title.trim()) errs.title = "Title is required.";
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

  const successMsg = "Create content successfully.";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-6 bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Create New Content</h2>

        <InputField
          label="Title"
          type="text"
          value={form.title}
          onChange={(value) => handleChange("title", value)}
          error={fieldErrors.title}
          placeholder="Content title"
        />
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

export default CreateContentModal;
