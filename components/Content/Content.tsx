import { ReactNode } from "react";
import { css, styled } from "../../lib/styled";
import { PostInput } from "../PostInput/PostInput";

type ContentProps = {
  /** Should display post input */
  showPost?: boolean;
  children: ReactNode;
};

export function Content({ children, showPost }: ContentProps) {
  return (
    <ContentRoot>
      {showPost && <PostInput />}
      {children}
    </ContentRoot>
  );
}

const ContentRoot = styled.div(
  ({ theme }) => css`
    --width: calc(100vw - 250px);

    width: var(--width);
    height: 100vh;
    margin: auto;

    main {
      padding: 0;
    }
  `
);
