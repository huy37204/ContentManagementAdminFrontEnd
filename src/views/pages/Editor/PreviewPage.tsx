import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { format, isValid } from "date-fns";
import { IContent } from "../../../interfaces/content";
import { findContentById } from "../../../services/Content/findContentById";
import TextModal from "../../components/Modal";
import { IBlock } from "../../../interfaces/block";

const getResponsiveColCount = (width: number): number => {
  if (width < 640) return 1; // mobile
  if (width < 768) return 2; // sm
  if (width < 1024) return 3; // md
  if (width < 1280) return 4; // lg
  return 5; // xl+
};

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<IContent | null>(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null
  );
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState<
    number | null
  >(null);
  const [colCount, setColCount] = useState<number>(
    getResponsiveColCount(window.innerWidth)
  );

  useEffect(() => {
    if (id) {
      findContentById(id).then((res) => {
        if ("data" in res) {
          const parsed = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            updatedAt: new Date(res.data.updatedAt),
          };
          setContent(parsed);
        }
      });
    }

    const handleResize = () => {
      setColCount(getResponsiveColCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const columns = useMemo(() => {
    if (!content) return [];

    const cols: { block: IBlock; realIndex: number }[][] = Array.from(
      { length: colCount },
      () => []
    );
    content.blocks.forEach((block, i) => {
      cols[i % colCount].push({ block, realIndex: i });
    });
    return cols;
  }, [content, colCount]);

  if (!content) return null;

  const createdAtStr = isValid(content.createdAt)
    ? format(content.createdAt, "hh:mm:ss a, dd/MM/yyyy")
    : "Invalid date";

  const updatedAtStr = isValid(content.updatedAt)
    ? format(content.updatedAt, "hh:mm:ss a, dd/MM/yyyy")
    : "Invalid date";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-1 min-w-[375px] px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full mt-10">
          <h1 className="font-bold text-[40px] sm:text-[50px] text-center mb-4">
            {content.title}
          </h1>
          <div className="text-gray-600 text-center mb-8">
            <p>🧑‍💻 Created by: {content.createdBy?.name || "Unknown"}</p>
            <p>🕒 Created at: {createdAtStr}</p>
            <p>✏️ Updated by: {content.updatedBy?.name || "Unknown"}</p>
            <p>🕒 Updated at: {updatedAtStr}</p>
          </div>
          <hr className="h-1 bg-[#FD7A7E] mb-4 flex mx-auto w-[50%]" />
          {/* Flex Column Responsive Layout */}
          <div className="flex gap-4">
            {columns.map((blocks, colIdx) => (
              <div key={colIdx} className="flex flex-col w-full">
                {blocks.map(({ block, realIndex }) => (
                  <div
                    key={realIndex}
                    className="mb-4 break-inside-avoid rounded-xl overflow-hidden bg-white shadow"
                  >
                    {block.type === "image" && (
                      <img
                        src={block.url!}
                        className="w-full h-auto object-cover"
                      />
                    )}
                    {block.type === "video" && (
                      <video
                        src={block.url!}
                        controls
                        className="w-full h-auto"
                      />
                    )}
                    {block.type === "text" && (
                      <div className="p-3 border rounded">
                        <h2 className="font-bold text-center mb-2">Text</h2>
                        {block.headings?.map((h, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 text-sm text-center p-2 my-1 rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              setSelectedBlockIndex(realIndex);
                              setSelectedHeadingIndex(i);
                            }}
                          >
                            {h}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <TextModal
          isOpen={selectedBlockIndex !== null && selectedHeadingIndex !== null}
          onClose={() => {
            setSelectedBlockIndex(null);
            setSelectedHeadingIndex(null);
          }}
        >
          {selectedBlockIndex !== null &&
            selectedHeadingIndex !== null &&
            content.blocks[selectedBlockIndex] &&
            content.blocks[selectedBlockIndex].type === "text" && (
              <div>
                <h2 className="text-xl font-bold mb-2 text-center">
                  {
                    content.blocks[selectedBlockIndex].headings?.[
                      selectedHeadingIndex
                    ]
                  }
                </h2>
                <p className="text-gray-700 whitespace-pre-line text-justify">
                  {
                    content.blocks[selectedBlockIndex].paragraphs?.[
                      selectedHeadingIndex
                    ]
                  }
                </p>
              </div>
            )}
        </TextModal>
      </div>
      <div className="bg-black sticky bottom-0 w-full z-50">
        <p className="text-[30px] font-bold text-center text-white p-2 m-0">
          PREVIEW MODE
        </p>
      </div>
    </div>
  );
};

export default PreviewPage;
