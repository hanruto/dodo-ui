import * as React from 'react';
interface Props {
    audio: any;
    url?: string;
}
export default class MusicCanvas extends React.Component<Props> {
    state: {
        loading: boolean;
        paused: boolean;
    };
    $canvas: any;
    hash: number;
    audioNode: any;
    bufferArray: any;
    audioCtx: any;
    audioStart: boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    handleInit: () => Promise<boolean>;
    handleStart: () => void;
    handlePause: () => void;
    handleResume: () => void;
    handleSuspend: () => void;
    handleDecode: (bufferArray: any, hash: any) => false | Promise<{}>;
    handleDraw: (analyser: any) => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
