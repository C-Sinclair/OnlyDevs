import { css, styled } from "../../lib/styled";

export function Sidebar({}) {
  return <SidebarRoot></SidebarRoot>;
}

type RootProps = {
  open?: boolean
}

const SidebarRoot = styled.div<RootProps>(
  ({ theme, open }) => css`
    --sidebar-width: ${open ? 250 : 60}px;

    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${theme.colours.tint[1]};
  `
);
