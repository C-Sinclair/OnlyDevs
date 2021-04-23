import { css, styled } from "../../lib/styled";

export function Sidebar({}) {
  return <SidebarRoot></SidebarRoot>;
}

const SidebarRoot = styled.div(
  ({ theme }) => css`
    --sidebar-width: ${theme.sizes.sidebar.width}px;

    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${theme.colours.pastel[0]};
  `
);
