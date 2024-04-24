import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TearFilesIcon(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M2 5.27L3.28 4 5 5.72l.28.28 1 1 2 2L16 16.72l2 2 2 2L18.73 22l-1.46-1.46c-.34.29-.77.46-1.27.46H8c-1.1 0-2-.9-2-2V9.27l-4-4M8 19h7.73L8 11.27V19M18 7v9.18l-2-2V9h-5.18l-2-2H18m-2.5-3H19v2H7.82l-2-2H8.5l1-1h5l1 1z" />
    </Svg>
  )
}

export default TearFilesIcon
