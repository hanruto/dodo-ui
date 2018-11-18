import React from 'react';
interface Props {
    getAudio?: Function;
    musics?: {
        pic: string;
        name: string;
        singer: string;
        url: string;
        id: string;
        lrc: string;
    }[];
    onPlay?: Function;
    audioConfig?: {
        position: string;
        size: string;
    };
}
export default class MusicPlayer extends React.Component<Props> {
    $audio: any;
    $list: any;
    $listInner: any;
    currentIndex: number;
    lyricStr: string;
    timer: any;
    state: {
        currentIndex: number;
        paused: boolean;
        currentTime: any;
        duration: any;
        open: boolean;
        showList: boolean;
        hiddenInBottom: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(nextProps: any): void;
    componentWillUnmount(): void;
    handleLoadLrc: () => void;
    handlePlay: () => void;
    handlePause: () => void;
    handlePlayFrom: (e: any) => boolean;
    handleNext: () => void;
    handlePrev: () => void;
    handleToggle: (currentIndex: any) => void;
    handleToggleOpen: () => void;
    handleToggleList: () => void;
    handleTogglePanel: () => void;
    readonly lyric: string | false;
    render(): false | JSX.Element;
}
export {};
