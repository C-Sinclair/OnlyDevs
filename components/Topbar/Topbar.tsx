import { css, styled } from "../../lib/styled";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";

export function Topbar({}) {
  const { loggedIn } = useAuth()
  return (
    <TopbarRoot>
      {!loggedIn && (
        <div className="buttons">
          <Link href="/login">Login</Link>
          <Link href="/register">Signup</Link>
        </div>
      )}
    </TopbarRoot>
  );
}

const TopbarRoot = styled.header(
  ({ theme }) => css`
    --topbar-height: 80px;

    width: 100vw;
    max-width: unset;
    height: var(--topbar-height);
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 80px 1fr 400px;
    grid-template-areas: logo free buttons;

    .buttons {
      grid-area: buttons;
      grid-row: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 20px;

      a {
        padding: 20px;
        font-size: 1.4em;
      }
    }
  `
);
