import React, { Component } from 'react';
interface MenuProps {
    menuIndex?: number;
    onClick?: React.MouseEventHandler;
    active?: boolean;
    className?: string;
    _key?: string;
}
export declare class MenuItem extends Component<MenuProps> {
    ripple: any;
    createRipple: (e: any) => void;
    render(): JSX.Element;
}
interface SubMenuProps {
    title: string;
}
export declare class SubMenu extends Component<SubMenuProps> {
    state: {
        isShow: boolean;
    };
    handleBeforeToggle: (isShow: any) => void;
    render(): JSX.Element;
}
interface MenusProps {
    width?: number;
}
export declare class MenuList extends Component<MenusProps> {
    menuCount: number;
    activeBar: any;
    state: {
        activeIndex: number;
    };
    handleMenuChange: (e: any, activeIndex: any) => void;
    MapMenu: (children: any) => any;
    render(): JSX.Element;
}
export {};
