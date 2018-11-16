import * as React from 'react';
interface Props {
    data: Array<any>;
    columns: Array<any>;
    type: String;
}
export default class Table extends React.Component<Props> {
    readonly data: {
        key: any;
        data: any[];
    }[];
    render(): JSX.Element;
}
export {};
