import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const MenuSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        {
            text: 'Dashboard',
            url: '/',
            icon: 'icon-home',
        },
        {
            text: 'Products',
            url: '/products',
            icon: 'icon-database',
        },
        {
            text: 'Orders',
            url: '/orders',
            icon: 'icon-bag2',
        },
        {
            text: 'Customers',
            url: '/customers',
            icon: 'icon-users2',
        },
        {
            text: 'Categories',
            url: '/categories',
            icon: 'icon-users2',
        },
        {
            text: 'Settings',
            url: '/settings',
            icon: 'icon-cog',
        },
        {
            text: 'loyalty Points',
            url: '/loyalty',
            icon: 'icon-cog',
        },
        {
            text: 'Coupons',
            url: '/coupon',
            icon: 'icon-cog',
        },
    ];

    return (
        <ul className="menu space-y-5">
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    className={
                        router.pathname === item.url
                            ? 'active text-yellow-700 space-y-5'
                            : 'space-y-5'
                    }>
                    <Link href={item.url}>
                        <div className="flex items-center space-x-5 ">
                            <i className={item.icon}></i>
                            <div
                                className={
                                    pathname === item.url
                                        ? ' text-yellow-500 font-semibold'
                                        : ''
                                }>
                                {item.text}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </ul>
    );
};

export default MenuSidebar;
