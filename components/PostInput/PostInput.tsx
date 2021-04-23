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
    --width: calc(100vw - ${2 * theme.sizes.sidebar.width + 40}px);

    border-radius: 4px;
    border: 2px solid ${theme.colours.pastel[5]};
    position: fixed;
    top: 0;
    width: var(--width);
    margin: 40px;
    display: flex;
    flex-direction: column;
    padding: 10px;

    .buttons {
      align-self: flex-end;

      button {
        padding: 4px;
        margin: 0;
        width: 80px;
        margin-left: 10px;
      }
    }
  `
);
