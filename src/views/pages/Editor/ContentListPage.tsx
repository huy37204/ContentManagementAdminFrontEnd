import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AddContentDto, IContent } from "../../../interfaces/content";
import { findAllContent } from "../../../services/Content/findAllContent";
import CreateContentModal from "../../components/CreateContentModal";
import { createContent } from "../../../services/Content/createContent";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { deleteContent } from "../../../services/Content/deleteContent";
import { Status } from "../../../enums/Status";
import { publishContent } from "../../../services/Content/publishContent";
import { format } from "date-fns";

const ContentListPage: React.FC = () => {
  const [contents, setContents] = useState<IContent[]>([]);
  //   Error msg
  const [errorCreateContent, setErrorCreateContent] = useState("");
  const [errorDeleteContent, setErrorDeleteContent] = useState("");
  //   Is success CRUD
  const [isCreateContentSuccess, setIsCreateContentSuccess] = useState(false);
  const [isDeleteContentSuccess, setIsDeleteContentSuccess] = useState(false);
  //   Popup Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Select Content
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null
  );
  const resetState = () => {
    setIsCreateContentSuccess(false);
    setIsDeleteContentSuccess(false);
  };
  const navigate = useNavigate();

  //   Create Content
  const handleCreate = async (content: AddContentDto) => {
    const response = await createContent(content);
    if ("error" in response) {
      setErrorCreateContent(response.error);
      return;
    }
    setIsCreateContentSuccess(true);
    setTimeout(() => {
      setShowCreateModal(false);
      resetState();
    }, 1000);
    fetchContents();
  };
  //   Delete Content
  const handleDelete = async () => {
    if (!selectedContentId) return;
    const response = await deleteContent(selectedContentId);
    if ("error" in response) {
      setErrorDeleteContent(response.error);
      return;
    }
    setIsDeleteContentSuccess(true);
    setTimeout(() => {
      setShowDeletePopup(false);
      resetState();
    }, 1000);
    fetchContents();
  };
  //  Publish Content
  const handlePublish = async (id: string) => {
    await publishContent(id);
    fetchContents();
  };

  const fetchContents = async () => {
    const res = await findAllContent();
    if ("data" in res) setContents(res.data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <div className="w-full min-w-[600px] sm:px-8 md:px-12 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contents</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New
        </button>
      </div>
      <CreateContentModal
        isOpen={showCreateModal}
        onClose={() => {
          resetState();
          setShowCreateModal(false);
        }}
        onCreate={handleCreate}
        errorMsg={errorCreateContent}
        isSuccess={isCreateContentSuccess}
      />
      <ConfirmDeleteModal
        isOpen={showDeletePopup}
        onClose={() => {
          setSelectedContentId(null);
          setShowDeletePopup(false);
          resetState();
        }}
        onConfirm={handleDelete}
        message="Do you really want to delete this content?"
        errorMsg={errorDeleteContent}
        isSuccess={isDeleteContentSuccess}
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 w-[120px]">IDD</th>
              <th className="border px-4 py-2 w-[120px]">Title</th>
              <th className="border px-4 py-2 w-[120px]">Status</th>
              <th className="border px-4 py-2 w-[120px]">Updated At</th>
              <th className="border px-4 py-2 w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr key={content._id}>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {content._id}
                </td>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {content.title}
                </td>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {content.status}
                </td>
                <td className="border px-4 py-2 w-[120px] truncate overflow-hidden whitespace-nowrap">
                  {format(content.updatedAt, "dd/MM/yyyy, hh:mm:ss a")}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white py-2 rounded w-[80px]"
                    onClick={() =>
                      navigate(`/editor/contents/${content._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 rounded w-[80px]"
                    onClick={() => {
                      setSelectedContentId(content._id);
                      setShowDeletePopup(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 rounded w-[80px]"
                    onClick={() =>
                      navigate(`/editor/contents/${content._id}/preview`)
                    }
                  >
                    Preview
                  </button>
                  {content.status === Status.DRAFT && (
                    <button
                      className="bg-green-500 text-white py-2 rounded w-[80px]"
                      onClick={() => {
                        handlePublish(content._id);
                      }}
                    >
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentListPage;
