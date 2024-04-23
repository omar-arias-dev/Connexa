import { View, StyleSheet } from "react-native";

export default function Divider(props) {

    const styles = StyleSheet.create({
        divider: {
            width: props.width,
            borderBottomColor: 'black',
            borderBottomWidth: 1.5,
        }
    })
    return (
        <View
            style={styles.divider}
        ></View>
    );
}
