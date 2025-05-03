// src/pages/editor/EditContentPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IContent } from "../../../interfaces/content";
import { IBlock } from "../../../interfaces/block";
import BlockEditor from "../../components/Editor/BlockEditor";
import { findContentById } from "../../../services/Content/findContentById";
import InputField from "../../components/InputFields";
import { updateContent } from "../../../services/Content/updateContent";

const EditContentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<IContent | null>(null);
  // Error
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    findContentById(id).then((res) => {
      if ("data" in res) setContent(res.data);
      else setError("Failed to load content");
    });
  }, [id]);

  const handleChangeTitle = (title: string) => {
    if (content) setContent({ ...content, title });
  };

  const handleBlocksChange = (blocks: IBlock[]) => {
    if (content) setContent({ ...content, blocks });
  };

  const handleSubmit = async () => {
    if (!content?.title) {
      setErrorTitle("Title is required");
      setError("Please fill in all blank");
      return;
    }
    if (!content || !id) return;
    setIsSubmitting(true);
    const res = await updateContent(id, {
      title: content.title,
      blocks: content.blocks,
    });
    setIsSubmitting(false);
    if ("error" in res) {
      setError(res.error);
      return;
    } else navigate(`/editor`);
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div className="p-6 w-full  mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Content</h1>

      <div className="mb-4">
        <InputField
          type="text"
          value={content.title}
          onChange={(value) => handleChangeTitle(value)}
          label="Title"
          error={errorTitle}
        />
      </div>

      <BlockEditor blocks={content.blocks} onChange={handleBlocksChange} />

      {error && (
        <p className="text-red-500 font-bold mt-2 text-center">{error}</p>
      )}

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={() => {
            navigate(`/editor/contents/${id}/preview`);
          }}
          disabled={isSubmitting}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Preview
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditContentPage;
