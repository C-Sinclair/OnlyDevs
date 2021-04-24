import { css, styled } from "../../lib/styled";
import Editor from "rich-markdown-editor";
import { useState } from "react";

export function PostInput({}) {
  const [value, setValue] = useState("");

  async function uploadImage(file: Blob) {
    return "url";
  }

  return (
    <PostInputRoot>
      <Editor dark uploadImage={uploadImage} onChange={setValue} />
      <div className="buttons">
        <button>Post</button>
        <button>Cancel</button>
      </div>
    </PostInputRoot>
  );
}

const PostInputRoot = styled.section(
  ({ theme }) => css`
    --width: calc(100vw - 500px);

    border-radius: 4px;
    border: 2px solid ${theme.colours.tint[5]};
    width: var(--width);
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    position: relative;

    .ProseMirror {
      padding: 20px 40px;
      width: calc(100% - 80px);
    }

    .buttons {
      align-self: flex-end;
      position: absolute;
      bottom: -10px;
      right: -10px;

      button {
        padding: 4px;
        margin: 0;
        width: 80px;
        margin-left: 10px;
      }
    }
  `
);
