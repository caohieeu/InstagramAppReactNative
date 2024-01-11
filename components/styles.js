import { StyleSheet } from "react-native";

const container = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    center: {
        flex: 1,
    },
    form: {
        flex: 1,
        margin: 25,
    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25,
        marginBottom: 200
    },
})

const form = StyleSheet.create({ 
    textInput: {
        borderWidth: 2, 
        marginBottom:6, 
        padding: 8, 
        borderRadius: 6,
        borderColor: '#AAAAAA'
    },
    button: {
        marginTop: 10,
    }
})

export { container, form }
