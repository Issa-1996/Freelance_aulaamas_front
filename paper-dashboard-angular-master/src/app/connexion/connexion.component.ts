import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "app/Services/auth.service";

@Component({
  selector: "connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.css"],
})
export class ConnexionComponent implements OnInit {
  addForm: FormGroup;
  helper = new JwtHelperService();
  username: any;
  password: any;
  erreurUsername = "";
  erreurPassword = "";
  erreur = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("token");
    this.addForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.addForm.get("username").valueChanges.subscribe(() => {
      this.erreurUsername = "";
      this.erreur = "";
    });
    this.addForm.get("password").valueChanges.subscribe(() => {
      this.erreurPassword = "";
      this.erreur = "";
    });
  }

  /**
   * Connexion de l'utilisateur qui appel la methode isLogin() de auth.service.ts
   */
  onSignIn() {
    if (this.addForm.get("username").value.trim() === "") {
      this.erreurUsername = "Nom d'utilisateur obligatoire !";
    }
    if (this.addForm.get("password").value.trim() === "") {
      this.erreurPassword = "Mot de passe obligatoire !";
    } else {
      if (this.addForm.invalid) {
        return;
      }
    }
    if (
      this.addForm.get("username").value.trim() != "" ||
      this.addForm.get("password").value.trim() != ""
    ) {
      this.authService
        .isLogin(
          this.addForm.get("username").value,
          this.addForm.get("password").value
        )
        .subscribe(
          (data: any) => {
            localStorage.setItem("token", data.token);
            const decodedToken = this.helper.decodeToken(data.token);
            // const roles: string[] = decodedToken.roles;
            this.router.navigate(['/container/dashboard']);
          },
          (error) => {
            if (error.status === 500 || error.status === 0) {
              this.erreur = "Erreur Serveur. Veillez resseyer svp.";
              return;
            } else {
              this.erreur = "Nom d'utilisateur ou mot de passe incorrect.";
            }
          }
        );
    }
  }
}
