import { BlockType } from "../enums/BlockType";

export interface IBlock {
  _id: string;
  type: BlockType;
  url?: string | null;
  headings?: string[] | null;
  paragraphs?: string[] | null;
}
