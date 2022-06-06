import { Routes } from "@angular/router";
import { ConnexionComponent } from "./connexion/connexion.component";
import { ContainerComponent } from "./container/container.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "connexion",
    pathMatch: "full",
  },
  {
    path: "connexion",
    component: ConnexionComponent
  },
  {
    path: "container",
    component: ContainerComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "connexion",
  },
];
