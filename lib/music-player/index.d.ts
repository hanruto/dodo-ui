import * as React from 'react';
interface Props {
    paused?: boolean;
    getAudio?: Function;
    musics?: {
        pic: string;
        name: string;
        singer: string;
        url: string;
        id: string;
        lrc: string;
    }[];
    audioConfig?: {
        position: string;
    };
    listId?: string;
    musicId?: string;
    onChange?: Function;
    onPlay?: Function;
    onPause?: Function;
}
export default class MusicPlayer extends React.Component<Props> {
    $audio: any;
    currentIndex: number;
    readonly randomList: any;
    state: {
        currentIndex: number;
        loop: boolean;
        currentTime: any;
        duration: any;
        random: boolean;
        open: boolean;
        showList: boolean;
    };
    timer: any;
    playTimer: any;
    playPromise: any;
    historyRoute: string;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    handlePlay: () => Promise<void>;
    handlePause: () => void;
    handleClear: () => void;
    handlePlayFrom: (e: any) => void;
    handleNext: () => void;
    handlePrev: () => void;
    handleToggle: (currentIndex: any) => void;
    handleChangeIndex: (nextIndex: any) => void;
    handleToggleOpen: () => void;
    handleToggleList: () => void;
    handleToggleLoop: () => void;
    handleRandom: () => void;
    render(): JSX.Element;
}
export {};
