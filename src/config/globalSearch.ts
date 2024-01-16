export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: string;
    label?: string;
}

export type SidebarNavItem = NavItem & {
    items: SidebarNavItem[];
}

export type NavItemWithChildren = NavItem & {
    items: NavItemWithChildren[];
}

interface NavConfig {
    mainNav: NavItem[];
    sidebarNav: SidebarNavItem[];
}

export const navConfig:NavConfig = {
    mainNav: [

    ],
    sidebarNav: [
        {
            title: 'Getting Started',
            items: [
                {
                    title: 'Introduction',
                    href: '/',
                    items: []
                }
            ]
        }
    ]
}