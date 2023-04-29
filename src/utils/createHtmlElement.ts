import { CSSProperties } from "react";

interface ElementProps {
  style?: CSSProperties;
  [key: string]: any;
}

type CssDeclaration = keyof Omit<CSSStyleDeclaration, "length" | "parentRule">;

export function createHtmlElement<T extends keyof HTMLElementTagNameMap> (
  nodeName: T,
  props: ElementProps,
) {
  const { style, ...nonStyleProps } = props;
  const element = Object.assign(document.createElement(nodeName), nonStyleProps);

  if (style !== undefined) {
 Object.entries(style).forEach(([key, value]) => {
      element.style[key as CssDeclaration] = value;
    });
}
  return element;
}
