
import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';





function Navigation() {
    
    const {t} = useTranslation();
    const location = useLocation();
    if (location.pathname==='/') return <div />;

    const reg = new RegExp(/[a-z]+/i);
    const activeMenuKey = location.pathname.match(reg)[0];

    return(
        <div>
            <Menu mode="horizontal" selectedKeys={[activeMenuKey]}>
                <Menu.Item key="home">
                    <Link to="/home">
                        {t('nav.home')}
                    </Link>
                </Menu.Item>
                <Menu.Item key="data">
                    <Link to="/data">
                        {t('nav.data')} 
                    </Link>
                </Menu.Item>
                <Menu.Item key="exposure">
                    <Link to="/exposure">
                        {t('nav.exposure')} 
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default Navigation;