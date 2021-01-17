import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { NewRideComponent } from '../../new-ride/new-ride.component';
import { ViewRideComponent } from '../../view-ride/view-ride.component';
import { CityComponent } from '../../city/city.component';
import { MusicComponent } from '../../music/music.component';
import { ChitChatComponent } from '../../chit-chat/chit-chat.component';
import { ViewRequestComponent } from 'app/view-request/view-request.component';
import { RequestRideComponent } from 'app/request-ride/request-ride.component';
import { UserMgmtComponent } from 'app/user-mgmt/user-mgmt.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'newRide',        component: NewRideComponent },
    { path: 'ViewRides',        component: ViewRideComponent },
    { path: 'ViewRequests',        component: ViewRequestComponent },
    { path: 'City',        component: CityComponent },
    { path: 'Music',        component: MusicComponent },
    { path: 'Chitchat',        component: ChitChatComponent },
    { path: 'requestRide',        component: RequestRideComponent },
    { path: 'UserMgmt',        component: UserMgmtComponent }
    
];
