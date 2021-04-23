import "styled-components";
import rawStyled, { css as rawCss } from "styled-components";
import { Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const styled = rawStyled;

export const css = rawCss;
