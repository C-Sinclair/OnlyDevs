import Link from "next/link";
import { css, styled } from "../../lib/styled";
import { Logo } from "../Logo/Logo";

export function Sidebar({}) {
  return (
    <SidebarRoot>
      <Link href='/'>
        <Logo />
      </Link>
    </SidebarRoot>
  )
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
