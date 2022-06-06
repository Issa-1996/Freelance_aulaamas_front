import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MaterialModule } from "./Material/matmodule.service";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HttpClientModule } from "@angular/common/http";
import { AjoutClientComponent } from './pages/Clients/ajout-client/ajout-client.component';
import { ModifierClientComponent } from './pages/Clients/modifier-client/modifier-client.component';
import { DetailClientComponent } from './pages/Clients/detail-client/detail-client.component';
import { DetailCommandeComponent } from './pages/Commandes/detail-commande/detail-commande.component';
import { ModifierCommandeComponent } from './pages/Commandes/modifier-commande/modifier-commande.component';
import { DetailDepenseComponent } from './pages/Depenses/detail-depense/detail-depense.component';
import { GestionClientsComponent } from "./pages/Clients/gestion-clients/gestion-clients.component";
import { GestionCommandeComponent } from "./pages/Commandes/gestion-commande/gestion-commande.component";
import { GestionDepenseComponent } from "./pages/Depenses/gestion-depense/gestion-depense.component";
import { NouveauCommandeComponent } from './pages/Commandes/nouveau-commande/nouveau-commande.component';
import { NouveauDepenseComponent } from './pages/Depenses/nouveau-depense/nouveau-depense.component';
import { NouveauModelComponent } from './pages/Models/nouveau-model/nouveau-model.component';
import { DetailModelComponent } from './pages/Models/detail-model/detail-model.component';
import { ModifierModelComponent } from './pages/Models/modifier-model/modifier-model.component';
import { GestionModelComponent } from './pages/Models/gestion-model/gestion-model.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GestionClientsComponent,
    GestionCommandeComponent,
    GestionDepenseComponent,
    AjoutClientComponent,
    ModifierClientComponent,
    DetailClientComponent,
    DetailCommandeComponent,
    ModifierCommandeComponent,
    DetailDepenseComponent,
    NouveauCommandeComponent,
    NouveauDepenseComponent,
    NouveauModelComponent,
    DetailModelComponent,
    ModifierModelComponent,
    GestionModelComponent,
    ConnexionComponent,
    ContainerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
