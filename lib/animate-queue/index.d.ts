import React from 'react';
/**
 * props
 *  autodetect 自动检测，根据滚动位置判断
 *  interval 动画队列间隔时间
 *  animate  不开启自动检测的时候，可以通过animate手动控制动画
 *  hidden Condition: showHeight  默认值是当
 */
interface Props {
    speed?: number;
    animate?: boolean;
    from?: object;
    to?: object;
}
export declare class Animate extends React.Component<Props> {
    render(): React.DetailedReactHTMLElement<{
        style: {
            transform: string;
            transition: string;
            opacity: number;
        };
    }, HTMLElement>[];
}
interface QueueProps {
    interval?: number;
    children?: any;
    onAnimateEnd?: Function;
    beforeAnimate?: Function;
}
export declare class AnimateQueue extends React.Component<Props & QueueProps> {
    timer: any;
    state: any;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleAnimate: (animate: boolean) => void;
    render(): JSX.Element[];
}
export declare class AnimateQueueGroup extends React.Component<Props & QueueProps> {
    state: {
        current: number;
    };
    animate: boolean;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleNextAnimate: () => void;
    render(): JSX.Element[];
}
export {};
