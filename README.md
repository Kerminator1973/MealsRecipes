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
