import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Favorites Screen!</Text>
        </View>
    );
};

// Настраиваем заголовок окна
FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favorites'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;
