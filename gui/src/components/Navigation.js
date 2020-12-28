
import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';





function Navigation() {
    const {t} = useTranslation();
    return(
        <div>
            <Menu mode="horizontal" theme="dark">
                <Menu.Item key="home">
                    {t('nav.home')}
                </Menu.Item>
                <Menu.Item key="exposure">
                    {t('nav.exposure')}
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default Navigation;