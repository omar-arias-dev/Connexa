import Svg, {Path} from 'react-native-svg';

function ConnectIcon(props) {
    return (
        <Svg
            viewBox="0 0 15 15"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}>
            <Path
                fill={props.fill}
                d="M1.5 0a1.5 1.5 0 101.415 2H7v12h5.085a1.5 1.5 0 100-1H8V1H2.915A1.5 1.5 0 001.5 0z"
            />
        </Svg>
    );
}

export default ConnectIcon;
