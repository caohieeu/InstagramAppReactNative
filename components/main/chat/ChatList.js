import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    FlatList, 
    TouchableOpacity, 
    Image,
    
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatList = (props) => {

const Data = [
    {
        id: 1,
        name: "cao hieu",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 2,
        name: "Thi Thanh",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 3,
        name: "Huynh Tuan",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 4,
        name: "Huynh Tuan",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 5,
        name: "Huynh Tuan",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 6,
        name: "Huynh Tuan",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    },
    {
        id: 7,
        name: "Huynh Tuan",
        image: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/357349891_941283860313373_4995595208565129984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF6-QYxaGCnE_SIZ_uxHaGYCKCF1sSnrcwIoIXWxKetzLG_O6kYhKdJ43Lb-wHxSXcInDlmWkC6h29O4XNox1dD&_nc_ohc=f0mv2ixrTggAX99bfAe&_nc_ht=scontent.fdad3-4.fna&oh=00_AfCFQFx9-qDEmf_yOmYNkdRw46Rka3vrg3SJ8s9_Mm9RbA&oe=65C3C904",
    }
]

const Item = ({data}) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate("Chat")}>
            <View style={styles.itemUser}>
                <View style={styles.itemContainerImage}>
                    <Image 
                        source={{ uri: data.image}}
                        style={styles.itemImage} />
                </View>
                <View style={styles.itemText}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        {data.name}
                    </Text>
                    <Text style={{opacity: 0.6}}>
                        Hello my friend !!
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

return (
    <View style={styles.safeArea}>
        <View style={styles.containerTextInput}>
            <MaterialCommunityIcons 
                name='magnify'
                size={20} />
            <TextInput
                placeholder='Search'
                style={styles.searchInput}>
            </TextInput>
        </View>
        <View style={{borderTopWidth: 1, borderColor: '#A9A9A9', flex: 1}}>
            <FlatList 
                data={Data}
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={Data.id}/>
        </View>
    </View>
)
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: 39,
    },
    containerTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        height: 40,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
    },
    searchInput: {
        height: 38,
        margin: 10,
        borderRadius: 7,
        flex: 1,
    },
    itemContainerImage: {
        width: 60,
        height: 60,
    },
    itemImage: {
        borderRadius: 40,
        flex: 1,
    },
    itemUser: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 20,
    },
    itemText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    }

});

export default ChatList;