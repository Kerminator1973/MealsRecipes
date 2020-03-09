import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';


const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{
                    true: Colors.primaryColor
                }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state} 
                onValueChange={props.onChange} 
            />
        </View>
    );
};

const FiltersScreen = props => {

    // Для динамически изменяемых элементов пользовательского
    // интерфейса, к которым относится Switch, необходимо применять
    // State Management для управляения их состоянием
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    // Это трюк, который позволяет использовать navigation без указания
    // перед ним props. См. useEffect()
    const { navigation } = props;

    // Функция сохраняет текущие состояния органов управления в отдельный объект.
    // useCallback() - является вспомогательным wrapper-ом, который вернёт изменённую
    // callback-функцию только в том случае, если измениться одна из указанных
    // зависимостей (они перечислены в квадратных скобках). Эта оптимизация позволяет
    // избежать ненужных перерисовок
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    // Функция, являющаяся аргументом useEffect() вызывается каждый раз
    // при обновлении компонента, но после того, как рендеринг выполнен.
    // В этот момент мы помещаем указатель на функцию saveFilters в
    // props.navigation, используя функцию setParams().
    // Указатель на эту функцию можно будет извлечь в обработчике onPress()
    // внутри FiltersScreen.navigationOptions и вызывать.
    // Второй параметр позволяет указать список переменных, изменение 
    // которых не должно приводить к re-rendering-у компонента. Это
    // так называемые "зависимости". В нашем случае, не следует выполнять
    // re-rendering в случае изменения функции saveFilters(), т.к.
    // сама эта функция изменяется при изменении свойств формы. Если бы
    // мы делали re-rendering, он был бы уже производный, не обязательный,
    // т.к. функция изменяется только при изменении свойств
    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={
                newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={
                newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label='Vegan' state={isVegan} onChange={
                newValue => setIsVegan(newValue)} />
            <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={
                newValue => setIsVegetarian(newValue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-save" 
                    onPress={() => {
                        navData.navigation.getParam('save')();
                    }}
                />
            </HeaderButtons>
        )        
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FiltersScreen;
