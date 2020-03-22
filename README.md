# Краткое описание проекта

Данный проект является обучающим и выполняется в рамках курса [React Native – the Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674818?start=0#overview) by [Maximilian Schwarzmüller](https://academind.com/).

Целью проекта является развитие навыков использования компонентов **Stack**, **Drawer** и **Tab** в [React Native](https://facebook.github.io/react-native/). Использование этих компонентов является частью, практически, любого приложения для мобильного телефона.

# React Navigation v4

В данном проекте используется [React Navigation v4](https://reactnavigation.org/docs/en/4.x/hello-react-navigation.html). Уже доступна версия [v5](https://reactnavigation.org/docs/en/hello-react-navigation.html). Поскольку отличия в синтаксисе более, чем малозаметные, использую пока то, что непосредственно изучаю.

Названия используемых компонентов: **StackNavigator**, **DrawerNavigator**, **TabsNavigator**. Компоненты устанавливаются по отдельности (с целью минимизации размера app bundle).

Установка StackNavigator: `npm install --save react-navigation-stack`

Импорт компонента: `import { createStackNavigator } from 'react-navigation-stack';`

Установка и импорт TabsNavigator:

```
npm install --save react-navigation-tabs
import { createBottomTabNavigator } from 'react-navigation-tabs';

```

Установка и импорт DrawerNavigator:

```
npm install --save react-navigation-drawer
import { createDrawerNavigator } from 'react-navigation-drawer';

```

В приведённых выше командах установки используется npm, но в практичесих задачах я использую [yarn](https://yarnpkg.com/).

# Совместное использование различных типов навигационных компонентов

В React Native можно комбинировать различные навигационные компоненты, например, сделать TabNavigator родительским (корневым) компонентом, а StackNavigator - добавить как один из дочерних компонентов.

Для того, чтобы определить компонент, который будет выполнять роль корневого следует использовать функцию-обёртку **createAppContainer**(). Ниже приведён соответствующий пример кода (файл MealsNavigator.js):

```javascript
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'; 

const MealsNavigator = createStackNavigator({
    Catogories: CategoriesScreen,       // Сокращённая форма
    CategoryMeals: {                    // Полная форма
        screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen
});

const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator
    },
    Favorites: FavoritesScreen
});

export default createAppContainer(MealsFavTabNavigator);
```

Вызов функции **createAppContainer**() позволяет явно указать, какой из навигационных компонентов является корневым.

# Настройка стилей навигационных компонентов

Генерацию компонентов, выполняющих навигационные задачи выполняют такие функции-обёртки, как: createBottomTabNavigator(), createStackNavigator(). Первый параметр - JavaScript-объект, описывает связь между элементом навигации (Tab, Stack-элемент) и экранной формой, а второй параметр позволяет указать стилистические особенности оформления элементов навигации.

Предположим, что у нас есть объект настраивающий цвета заголовка навигационного элемента:

```javascript
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' 
            ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' 
        ? 'white' : Colors.primaryColor
};
```

Мы можем использовать этот объект для настройки параметров каждого из навигационных компонентов:

```javascript
const MealsNavigator = createStackNavigator({
    Catogories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
},        
{   // Настраиваем стиль оформления заголовка для StackNavigator
    defaultNavigationOptions: defaultStackNavOptions
});
```

Второй компонент используется и для настройки BottonTabNavigator:

```javascript
const MealsFavTabNavigator = createBottomTabNavigator({
...
}, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});
```

# Работа с состоянием приложения (Redux Store)

В компоненте может произойти событие, которое влияет на состояние всего приложения. Когда такое случается возникает некоторое действие (action). **Action** – это некоторая функция, принимающая некоторый набор аргументов. Подобная функция возвращает словарь, в котором есть поле type (тип действия) и набор дополнительных параметров (любых).

Для активации действия используется специальный hook, под названием **useDispatch**(). Часто этот hook используется совместно с другим hook-ом под названием **useCallback**() для оптимизации перерисовок компонента. В общем случае схема выглядит так:

```javascript
import { useDispatch } from 'react-redux';
...
const FiltersScreen = props => {
	...
	const dispatch = useDispatch();
	...
	const saveFilters = useCallback(() => {
		...
		dispatch(setFilters(appliedFilters)); // <-- Здесь мы запускаем "действие"
	}, [..., dispatch]);
```

В приведённом выше коде, функция **saveFilters**() вызывается, когда нажимается кнопка «Save» в пользовательском интерфейсе и с этого момента начинается изменение состояния приложения.

Код, генерируемый hook-ом useDispatch(), приводит к тому, что вызываются т.н. reducer-ы – функции, которые изменяют состояние приложения. Регистрация reducer-ов осуществляется в файле «App.js» (на самом высоком уровне). Выглядеть это может так:

```javascript
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
...
const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);
...
export default function App() {
  return (
    <Provider store={store}><MealsNavigator /></Provider>
  );
}
```

В приведённом выше коде крайне важным является использование компонента **Provider** в JSX-коде, который встраивает Redux Store в систему hook-ов React Native.

Redux передаёт инициированное действие reducer-ам, которые являются функцией, возвращающей новое состояние приложения. Чаще всего, reducer менять только некоторую часть состояния, например:

```javascript
const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
	...
	case SET_FILTERS:
		const appliedFilters = action.filters;
		const updatedFilteredMeals = state.meals.filter(meal => {...
		});
		return {...state, filteredMeals: updatedFilteredMeals};
    }
    return state;
}
```

При изменении состояния приложения все компоненты, которые используют Redux Store будут перегенерированы (re-rendered). Получить текущее состояние приложения можно используя hook **useSelector**():

```javascript
const CategoryMealScreen = props => {
    const availableMeals = useSelector(state => state.meals.filteredMeals);
	...
	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
    );
    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};
```

Отличная статья: https://academind.com/learn/react/redux-vs-context-api/#what-is-redux

Принципиально, можно разработать App State Management System и без Redux, используя только hooks.
Redux прекрасно подходит для больших приложений, но у него есть восходящий конкурент – Context API: https://academind.com/learn/react/redux-vs-context-api/
