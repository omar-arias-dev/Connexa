import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M8.7 10a1 1 0 001.41 0 1 1 0 000-1.41l-6.27-6.3a1 1 0 00-1.42 1.42zM21 14a1 1 0 00-1 1v3.59L15.44 14A1 1 0 0014 15.44L18.59 20H15a1 1 0 000 2h6a1 1 0 00.38-.08 1 1 0 00.54-.54A1 1 0 0022 21v-6a1 1 0 00-1-1zm.92-11.38a1 1 0 00-.54-.54A1 1 0 0021 2h-6a1 1 0 000 2h3.59L2.29 20.29a1 1 0 000 1.42 1 1 0 001.42 0L20 5.41V9a1 1 0 002 0V3a1 1 0 00-.08-.38z" />
    </Svg>
  )
}

export default SvgComponent;
