import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { GestionClientsComponent } from 'app/pages/Clients/gestion-clients/gestion-clients.component';
import { GestionCommandeComponent } from 'app/pages/Commandes/gestion-commande/gestion-commande.component';
import { GestionDepenseComponent } from 'app/pages/Depenses/gestion-depense/gestion-depense.component';
import { GestionModelComponent } from 'app/pages/Models/gestion-model/gestion-model.component';
import { ConnexionComponent } from 'app/connexion/connexion.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user',           component: UserComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'client',         component: GestionClientsComponent },
    { path: 'commande',       component: GestionCommandeComponent},
    { path: 'depense',       component: GestionDepenseComponent},
    { path: 'model',       component: GestionModelComponent},
];
