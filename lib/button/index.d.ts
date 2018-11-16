import * as React from 'react';
/**
 * 1. 样式控制，是否需要shadow, border, 是否全宽度
 * 2. 类型控制 primary danger warning default success
 * 3.
 */
interface Props {
    type?: string;
    size?: number;
    clickProtectDuration?: number;
    disabled?: boolean;
    style?: object;
    className?: string;
    onClick?: React.MouseEventHandler;
    onMouseDown?: React.MouseEventHandler;
    fullWidth?: boolean;
    shadow?: boolean;
}
export default class Button extends React.Component<Props> {
    status: number;
    ripple: any;
    handleClick: (e: any) => boolean;
    handleMouseDown: (e: any) => boolean;
    createRipple: (e: any) => boolean;
    render(): JSX.Element;
}
export {};
