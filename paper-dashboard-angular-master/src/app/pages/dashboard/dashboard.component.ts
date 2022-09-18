import { Component, OnInit } from "@angular/core";
import { MethodeCommandeService } from "app/Services/methode-commande.service";
import { MethodeDepenseService } from "app/Services/methode-depense.service";
import Chart from "chart.js";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  depenses: number = 0;
  ventes: number;
  benefice: number = 0;

  constructor(
    private methodeDepense: MethodeDepenseService,
    private methodeCommande: MethodeCommandeService
  ) {}
  ngOnInit() {
    this.depense();
    this.vente();
    this.diagramme();
  }
  depense() {
    this.methodeDepense.getAllDepenses().subscribe((data) => {
      for (var i = 0; i < data["hydra:member"].length; i++) {
        this.depenses += Number(data["hydra:member"][i]["prix"]);
      }
    });
  }
  vente() {
    this.methodeCommande.getAllCommandes().subscribe((data) => {
      for (var i = 0; i < data["hydra:member"].length; i++) {
        this.ventes += Number(data["hydra:member"][i]["prix"]);
      }
    });
    return this.ventes;
  }
  diagramme(){
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              "#4acccd", //ACHAT
              "#fcc468", //BENEFICE
              "#ef8157", //DEPENSE
            ],
            borderWidth: 0,
            data: [150, 100, 200],
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40],
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30],
      fill: false,
      borderColor: "#51CACF",
      backgroundColor: "transparent",
      pointBorderColor: "#51CACF",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var speedData = {
      labels: [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ],
      datasets: [dataFirst, dataSecond],
    };

    var chartOptions = {
      legend: {
        display: false,
        position: "top",
      },
    };

    var lineChart = new Chart(speedCanvas, {
      type: "line",
      hover: false,
      data: speedData,
      options: chartOptions,
    });
  }
}
