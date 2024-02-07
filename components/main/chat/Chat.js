import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    Image,
    TextInput
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = (props) => {

const [maxTimestampLeft, setMaxTimestampLeft] = useState(1707216540);
const [maxTimestampRight, setMaxTimestampRight] = useState(1707216698);
const [message, setMessage] = useState("");

const Data = [
    {
        name: 'Caohieeu',
        image: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=osMhVcJ850MAX9osxvM&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC2IA66t7rWF6smsRi9B1l6QoK4v9Zo_h2AciRC92tMwQ&oe=65C7BD84',
        message: 'Hello',
        lastMessageTimestamp: '1707216540'
    },
    {
        name: 'Caohieeu',
        image: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=osMhVcJ850MAX9osxvM&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC2IA66t7rWF6smsRi9B1l6QoK4v9Zo_h2AciRC92tMwQ&oe=65C7BD84',
        message: 'How are u to day',
        lastMessageTimestamp: '1707216553'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'Nice to meet you bro asdddddddddddddddddddddddddddddddddddddddddddddddddddd!',
        lastMessageTimestamp: '1707216698'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'Im so boring..',
        lastMessageTimestamp: '1707232248'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288170'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288171'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288172'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288173'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288174'
    },
    {
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: 'haizz i need my lover',
        lastMessageTimestamp: '1707288175'
    },
    {
        name: 'Caohieeu',
        image: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=osMhVcJ850MAX9osxvM&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC2IA66t7rWF6smsRi9B1l6QoK4v9Zo_h2AciRC92tMwQ&oe=65C7BD84',
        message: 'Dont spam bro :v',
        lastMessageTimestamp: '1707216554'
    },
];

useEffect(() => {
    Data.forEach((user, index) => {
        if(user.lastMessageTimestamp >= maxTimestampLeft && user.name=='Caohieeu')
            setMaxTimestampLeft(user.lastMessageTimestamp);
        else {
            setMaxTimestampRight(user.lastMessageTimestamp);
        }
    })
}, [Data])

function sendMessage (txtMessage) {
    Data.push({
        name: 'Thanh Nhan',
        image: 'https://kenh14cdn.com/203336854389633024/2023/2/1/photo-3-1675242468977648359743.jpg',
        message: txtMessage,
        lastMessageTimestamp: `${Date.now}`
    })
}

const Item = ({ data }) => {
    if(data.name == "Thanh Nhan") {
        return (
            <View style={[styles.itemMessage, {alignSelf: 'flex-end'}]}>
                <View style={[styles.boxMessage, styles.boxMessageRight]}>
                    <Text style={[styles.textMessage, {color: 'white'}]}>
                        {data.message}
                    </Text>
                </View> 
                {data.lastMessageTimestamp==maxTimestampRight ?
                    <View style={styles.iconUserRight}>
                        <Image 
                        source={{ uri: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=osMhVcJ850MAX9osxvM&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC2IA66t7rWF6smsRi9B1l6QoK4v9Zo_h2AciRC92tMwQ&oe=65C7BD84' }}
                            style={{flex: 1, borderRadius: 40}} />
                    </View>
                    :
                    <View style={styles.iconUserRight}></View> }
            </View>
        )
    }
    else {
        return (
            <View style={[styles.itemMessage, {alignSelf: 'flex-start'}]}>
                {data.lastMessageTimestamp==maxTimestampLeft ?
                <View style={styles.iconUserLeft}>
                    <Image 
                        source={{ uri: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=osMhVcJ850MAX9osxvM&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC2IA66t7rWF6smsRi9B1l6QoK4v9Zo_h2AciRC92tMwQ&oe=65C7BD84' }}
                        style={{flex: 1, borderRadius: 40}} />
                </View>
                :
                <View style={styles.iconUserLeft}></View> }
                <View style={[styles.boxMessage, styles.boxMessageLeft]}>
                    <Text style={styles.textMessage}>
                        {data.message}
                    </Text>
                </View>
            </View>
        )
    }
}

useEffect(() => {
    props.navigation.setOptions({
        title: 'Caohieeu',
        headerTitleAlign: 'center',
        headerRight: () => (
            <View style={styles.headerRight}>
                <TouchableOpacity>
                    <MaterialCommunityIcons 
                        name='dots-vertical'
                        size={26}
                        color={'black'} />
                </TouchableOpacity>
            </View>
        )
    })
}, [])
return (
    <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.chatContainer}>
            <FlatList 
                data={Data}
                renderItem={({item}) => <Item data={item} /> }
                keyExtractor={(item) => item.lastMessageTimestamp.toString()} />
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
               <TextInput
                    onChangeText={(text) => setMessage(text)}
                    placeholder='Enter message...' />
            </View>
            <TouchableOpacity
                onPress={() => sendMessage(message)} >
                <MaterialCommunityIcons 
                    name='send-circle'
                    size={26}
                    style={{marginLeft: 5}} />
            </TouchableOpacity>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerRight: {
        flex: 1,
        justifyContent: 'center'
    },
    boxMessage: {
        marginBottom: 10,
        maxWidth: '70%',
        padding: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, 
        },
        shadowOpacity: 0.3, 
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 30,
    },
    boxMessageLeft: {
        alignSelf: 'flex-start',
    },
    boxMessageRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#1E90FF',
    },
    textMessage: {
        fontSize: 17,
    },
    itemMessage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconUserRight: {
        width: 20, 
        height: 20,
        marginLeft: 5,
    },
    iconUserLeft: {
        width: 20, 
        height: 20,
        marginRight: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    inputBox: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        flex: 1,
    }
})

export default Chat;