import * as React from 'react';
interface Props {
    type: string;
    antd?: boolean;
    className?: string;
    active?: boolean;
    onClick?: React.MouseEventHandler;
}
export default class SvgIcon extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
