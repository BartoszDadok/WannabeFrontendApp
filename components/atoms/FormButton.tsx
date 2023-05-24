import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableWithoutFeedback, View, Animated } from "react-native";

interface FormButtonProps {
    title: string;
    backgroundColor: any;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const FormButton = ({ title, backgroundColor, onPress }: FormButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={ onPress }>
            <Animated.View style={ [styles.container, { backgroundColor }] }>
                <Text style={ styles.title }>{ title }</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontFamily: "open-sans",
    },
});
export default FormButton;