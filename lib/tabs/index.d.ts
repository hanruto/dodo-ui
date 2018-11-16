import React, { Component } from 'react';
interface TabProps {
    value?: string | number;
    active?: boolean;
    onClick?: React.MouseEventHandler;
    width?: number;
    className?: string;
    style?: any;
    changeBarToTab?: Function;
}
export declare class Tab extends Component<TabProps> {
    tab: any;
    ripple: any;
    createRipple: (e: any) => void;
    render(): JSX.Element;
}
/**
 * 1. 设置tab的label和value
 * 2. onChange 方法回调
 */
interface TabsProps {
    value?: string | number;
    onChange?: Function;
    width?: number;
    className?: string;
    style?: any;
    type?: string;
}
export declare class Tabs extends Component<TabsProps> {
    activeBar: any;
    activeTab: any;
    componentDidUpdate(): void;
    handleClickTab: (_: any, value: any, index: any) => void;
    componentDidMount(): void;
    handleChangeBar: () => void;
    render(): JSX.Element;
}
export {};
