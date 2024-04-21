import { TouchableOpacity, Text } from 'react-native';

export default function BasicButton({
    customFunction,
    text = null,
    icon = null,
    disabled = false,
    containerStyle,
    textStyle = null,
}) {
    return (
        <TouchableOpacity
            onPress={() => customFunction()}
            style={containerStyle}
            disabled={disabled}
        >
            {
                icon && (
                    icon
                )
            }
            {
                text && (
                    <Text style={textStyle}>{text}</Text>
                )
            }
        </TouchableOpacity>
    );
}
