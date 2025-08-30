// src/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      view: string;
      edit: string;
      delete: string;
      text: string;
      background: string;
    };
  }
}
