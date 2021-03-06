import * as React from 'react';
/**
 * props
 *  autodetect 自动检测，根据滚动位置判断
 *  interval 动画队列间隔时间
 *  animate  不开启自动检测的时候，可以通过animate手动控制动画
 *  speed 动画的速度
 */
interface Props {
    speed?: number;
    animate?: boolean;
    from?: object;
    to?: object;
}
declare class Animate extends React.Component<Props> {
    render(): React.DetailedReactHTMLElement<{
        style: {
            transform: string;
            transition: string;
            opacity: number;
        };
    }, HTMLElement>[];
}
declare class AnimateQueueGroup extends React.Component<Props & QueueProps> {
    state: {
        current: number;
    };
    animate: boolean;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleNextAnimate: () => void;
    render(): JSX.Element[];
}
interface QueueProps {
    interval?: number;
    children?: any;
    onAnimateEnd?: Function;
    beforeAnimate?: Function;
}
export declare class AnimateQueue extends React.Component<QueueProps & Props> {
    timer: any;
    state: {
        current: number;
    };
    static Item: typeof Animate;
    static Group: typeof AnimateQueueGroup;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    handleAnimate: (animate: any) => void;
    componentWillUnmount(): void;
    render(): JSX.Element[];
}
export {};
