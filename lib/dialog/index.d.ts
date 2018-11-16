import * as React from 'react';
interface Props {
    title?: string;
    visible?: boolean;
    onCancel?: any;
    onOk?: any;
    animationIn?: string;
    animationDuration?: number;
}
declare class Dialog extends React.Component<Props> {
    el: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    static open: (option: any) => void;
    render(): any;
}
export default Dialog;
