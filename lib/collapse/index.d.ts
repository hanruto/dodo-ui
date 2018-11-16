import { Component } from 'react';
interface Props {
    head?: any;
    isShow?: boolean;
    onChange?: Function;
    beforeChange?: Function;
    style?: any;
    className?: string;
}
export default class Collapse extends Component<Props> {
    duration: number;
    panelWrapper: any;
    panel: any;
    panelHeight: number;
    state: {
        isShow: boolean;
        status: number;
    };
    handleCollapse: () => boolean;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
