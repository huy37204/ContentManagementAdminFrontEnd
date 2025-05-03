import React from "react";
import { IBlock } from "../../../interfaces/block";
import { BlockType } from "../../../enums/BlockType";
import { uploadToS3 } from "../../../services/Upload/uploadService";
import InputField from "../InputFields";

interface Props {
  blocks: IBlock[];
  onChange: (blocks: IBlock[]) => void;
}

const BlockEditor: React.FC<Props> = ({ blocks, onChange }) => {
  const handleBlockChange = (index: number, updated: IBlock) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updated;
    onChange(newBlocks);
  };

  const handleAddBlock = (type: IBlock["type"]) => {
    const newBlock: IBlock =
      type === BlockType.TEXT
        ? { type, headings: [""], paragraphs: [""] }
        : { type, url: "" };
    onChange([...blocks, newBlock]);
  };

  const handleRemoveBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="h-[500px] overflow-auto border rounded p-4 shadow bg-white flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span></span>
              <strong className="mx-auto">
                {block.type.toUpperCase()} Block
              </strong>
              <button
                onClick={() => handleRemoveBlock(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>

            {block.type === "text" && (
              <>
                {block.headings?.map((heading, i) => {
                  const headingError = !heading?.trim()
                    ? "Heading is required"
                    : undefined;
                  const paragraphError = !block.paragraphs?.[i]?.trim()
                    ? "Paragraph is required"
                    : undefined;

                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 border-2 p-4 shadow-md relative"
                    >
                      <button
                        onClick={() => {
                          const newHeadings = block.headings!.filter(
                            (_, idx) => idx !== i
                          );
                          const newParagraphs = block.paragraphs!.filter(
                            (_, idx) => idx !== i
                          );
                          handleBlockChange(index, {
                            ...block,
                            headings: newHeadings,
                            paragraphs: newParagraphs,
                          });
                        }}
                        className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
                      >
                        ❌
                      </button>
                      <InputField
                        label={`Heading ${i + 1}`}
                        value={heading}
                        onChange={(value) => {
                          const newHeadings = [...(block.headings || [])];
                          newHeadings[i] = value;
                          handleBlockChange(index, {
                            ...block,
                            headings: newHeadings,
                          });
                        }}
                        error={headingError}
                      />
                      <InputField
                        label={`Paragraph ${i + 1}`}
                        value={block.paragraphs![i]}
                        onChange={(value) => {
                          const newParagraphs = [...(block.paragraphs || [])];
                          newParagraphs[i] = value;
                          handleBlockChange(index, {
                            ...block,
                            paragraphs: newParagraphs,
                          });
                        }}
                        error={paragraphError}
                      />
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    const newHeadings = [...(block.headings || []), ""];
                    const newParagraphs = [...(block.paragraphs || []), ""];
                    handleBlockChange(index, {
                      ...block,
                      headings: newHeadings,
                      paragraphs: newParagraphs,
                    });
                  }}
                  className="w-full text-center border-2 border-dashed border-blue-600 text-blue-500 hover:underline text-sm self-end mt-1 py-4"
                >
                  + Add Heading & Paragraph
                </button>
              </>
            )}

            {(block.type === "image" || block.type === "video") && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept={block.type === "image" ? "image/*" : "video/*"}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const response = await uploadToS3(file);
                    if ("url" in response) {
                      handleBlockChange(index, {
                        ...block,
                        url: response.url,
                      });
                    } else {
                      handleBlockChange(index, {
                        ...block,
                        url: `❌ Upload failed: ${response.error}`,
                      });
                    }
                  }}
                />
                <input
                  type="text"
                  value={block.url || ""}
                  readOnly
                  className={`border px-2 py-1 w-full ${
                    block.url?.startsWith("❌")
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                />
                {block.type === "image" &&
                  block.url &&
                  !block.url.startsWith("❌") && (
                    <img
                      src={block.url}
                      alt="preview"
                      className="h-full w-auto max-h-[300px] object-contain border rounded"
                    />
                  )}
                {block.type === "video" &&
                  block.url &&
                  !block.url.startsWith("❌") && (
                    <video
                      src={block.url}
                      controls
                      className="h-full w-auto max-h-[300px] border rounded"
                    />
                  )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleAddBlock(BlockType.TEXT)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Text
        </button>
        <button
          onClick={() => handleAddBlock(BlockType.IMAGE)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Add Image
        </button>
        <button
          onClick={() => handleAddBlock(BlockType.VIDEO)}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          + Add Video
        </button>
      </div>
    </div>
  );
};

export default BlockEditor;
