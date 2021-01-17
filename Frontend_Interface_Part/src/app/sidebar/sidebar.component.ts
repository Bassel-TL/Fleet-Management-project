import { Component, OnInit } from '@angular/core';
import { User } from 'app/domains/User';
import { LocalStorageService } from 'app/services/localStorageService';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
    { path: '/newRide',    title: 'Create New Ride',        icon:'nc-bus-front-12', class: '' },
    { path: '/ViewRides',    title: 'View My Rides',        icon:'nc-icon nc-globe', class: '' },
    // { path: '/Users',    title: 'User Management',        icon:'nc-caps-small', class: '' },
    { path: '/ViewRequests',    title: 'View Requests',        icon:'nc-icon nc-map-big', class: '' },
    { path: '/requestRide',       title: 'Ride request',    icon:'nc-bus-front-12',  class: '' },
    { path: '/UserMgmt',    title: 'User Management',        icon:'nc-icon nc-single-02', class: '' },
    { path: '/City',    title: 'City Management',        icon:'nc-icon nc-bank', class: '' },
    { path: '/Music',    title: 'Music',        icon:'nc-icon nc-headphones', class: '' },
    { path: '/Chitchat',    title: 'Chitchat',        icon:'nc-icon nc-satisfied', class: '' },
    
];

export const ROUTES_USER: RouteInfo[] = [
    // { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
    // { path: '/newRide',    title: 'Create New Ride',        icon:'nc-bus-front-12', class: '' },
    // { path: '/ViewRides',    title: 'View My Rides',        icon:'nc-icon nc-globe', class: '' },
    // { path: '/Users',    title: 'User Management',        icon:'nc-caps-small', class: '' },
    // { path: '/ViewRequests',    title: 'View Requests',        icon:'nc-icon nc-map-big', class: '' },
    { path: '/requestRide',       title: 'Ride request',    icon:'nc-bus-front-12',  class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    
];

export const ROUTES_DRIVER: RouteInfo[] = [
    { path: '/newRide',    title: 'Create New Ride',        icon:'nc-bus-front-12', class: '' },
    { path: '/ViewRides',    title: 'View My Rides',        icon:'nc-icon nc-globe', class: '' },
    { path: '/ViewRequests',    title: 'View Requests',        icon:'nc-icon nc-map-big', class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    
];

export const ROUTES_ADMIN: RouteInfo[] = [
    { path: '/UserMgmt',    title: 'User Management',        icon:'nc-icon nc-single-02', class: '' },
    { path: '/City',    title: 'City Management',        icon:'nc-icon nc-bank', class: '' },
    { path: '/Music',    title: 'Music',        icon:'nc-icon nc-headphones', class: '' },
    { path: '/Chitchat',    title: 'Chitchat',        icon:'nc-icon nc-satisfied', class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    constructor(private storage: LocalStorageService) {​​ }

    public menuItems: any[];
    ngOnInit() {
        var user:User = this.storage.getFromLocalStorage();

        if(user.role_n === "ADMIN"){
            this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
        }
        if(user.role_n === "USER"){
            this.menuItems = ROUTES_USER.filter(menuItem => menuItem);
        }
        if(user.role_n === "DRIVER"){
            this.menuItems = ROUTES_DRIVER.filter(menuItem => menuItem);
        }
        
    }
}
