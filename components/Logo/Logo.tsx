import { MouseEventHandler } from "react"
import { css, styled } from "../../lib/styled"

type LogoProps = {
  onClick?: MouseEventHandler
}

export function Logo({ onClick }: LogoProps) {
  return (
    <LogoRoot data-logo onClick={onClick}>
      <p>Only<span>Devs</span></p>
      <hr />
    </LogoRoot>
  )
}

const LogoRoot = styled.div(({ theme, onClick }) => css`
  --size: 20px;

  position: relative;
  font-family: ${theme.fonts.mono};
  font-size: calc(0.4 * var(--size));
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  cursor: ${!!onClick ? 'pointer' : 'default'};

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