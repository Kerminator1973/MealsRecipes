import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
    // Копируем все "внешние" атрибуты компонента в <HeaderButton>.
    // Также передаём в <HeaderButton> набор иконок
    return <HeaderButton 
        {...props} 
        IconComponent={Ionicons} 
        iconSize={23} 
        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} />;
};

export default CustomHeaderButton;