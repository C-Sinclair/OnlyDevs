import { css, styled } from "../../lib/styled"

export function Logo({}) {
  return (
    <LogoRoot data-logo>
      <p>Only<span>Devs</span></p>
      <hr />
    </LogoRoot>
  )
}

const LogoRoot = styled.div(({ theme }) => css`
  --size: 20px;

  position: relative;
  font-family: ${theme.fonts.mono};
  font-size: calc(0.4 * var(--size));
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  span {
    font-family: ${theme.fonts.hand};
    font-size: var(--size);
    margin-top: -5px;
  }

  hr {
    position: absolute;
    top: 10px;
    width: calc(var(--size) / 2);
    height: 3px;
    margin-right: 88px;
    animation: pulse 3s infinite;
    transition: all 1s;
  }

  @keyframes pulse {
    from {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`)