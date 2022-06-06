import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/container/dashboard',     title: 'Tableau de Bord',   icon:'nc-bank',       class: '' },
    { path: '/container/client',        title: 'Gestion Clients',   icon:'nc-single-02',  class: '' },
    { path: '/container/model',         title: 'GESTION DES MODELS',icon:'nc-scissors', class: '' },
    { path: '/container/commande',      title: 'Gestion Commandes', icon:'nc-tag-content',class: '' },
    { path: '/container/depense',       title: 'Gestion Depenses',  icon:'nc-money-coins', class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
