import { CSSProperties } from "react"

type ElementProps = {
    style?: CSSProperties;
    [key: string]: any;
}

export function createHtmlElement<T extends keyof HTMLElementTagNameMap>(nodeName: T, props: ElementProps) {
    const {style, ...nonStyleProps} = props;
    const element = Object.assign(document.createElement(nodeName), props);
    if(style != undefined)
    Object.entries(style).forEach(([key, value]) => { element.style[key as any] = value });
    return element;
}