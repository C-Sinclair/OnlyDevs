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
    --margin-top: ${theme.sizes.topbar.height}px;
    --margin-left: ${theme.sizes.sidebar.width}px;
    --width: calc(100vw - ${2 * theme.sizes.sidebar.width}px);
    --height: calc(100vh - ${theme.sizes.topbar.height}px);

    width: var(--width);
    height: var(--height);
    margin-left: var(--margin-left);
    margin-top: var(--margin-top);
  `
);
