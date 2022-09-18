import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ROUTES } from "../../sidebar/sidebar.component";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MethodeUsersService } from "app/Services/methode-users.service";

@Component({
  moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  decodedToken: any;
  helper = new JwtHelperService();
  public username: any[];
  prenom:any;
  nom:any;
  constructor(
    location: Location,
    private methodeClient: MethodeUsersService,
    private element: ElementRef,
    private router: Router
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.getUserConnecte();    

    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getUserConnecte(){
    this.decodedToken = this.helper.decodeToken(localStorage.getItem("token"));
    this.username = this.decodedToken.username;
    this.methodeClient.getUserConnected(this.username).subscribe((data)=>{
      this.prenom = data["hydra:member"][0]["prenom"];
      this.nom = data["hydra:member"][0]["nom"];
    })
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "AULAAMAS";
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }
}
