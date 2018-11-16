import * as React from 'react';
interface Props {
    onScrollInto: Function;
    onScrollOut: Function;
}
export default class ScrollDetect extends React.Component<Props> {
    el: any;
    componentDidMount(): void;
    handleDetect: () => void;
    render(): JSX.Element;
}
export {};
