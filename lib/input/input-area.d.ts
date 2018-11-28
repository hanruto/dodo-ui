import * as React from 'react';
export default class InputArea extends React.Component<any> {
    state: {
        focus: boolean;
        dirty: boolean;
    };
    $input: any;
    handleFocus: (e: any) => void;
    handleBlur: (e: any) => void;
    handleChange: (e: any) => void;
    setFocus: () => void;
    render(): JSX.Element;
}
