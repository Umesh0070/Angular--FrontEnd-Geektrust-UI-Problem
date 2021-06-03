import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit {
  title = 'falcone';
  selectedPlanet1: any
  welcomeMsg: any;
  description: any
  selectedPlanet2: any
  selectedPlanet3: any
  selectedPlanet4: any;
  getplanet: any[] = [];
  planets: string[] = [];
  planetTwo: string[] = [];
  planetThree: string[] = []
  planetFour: string[] = []
  vehicleNames: any[] = []
  selectedVehicle1: any
  selectedVehicle2: any
  selectedVehicle3: any
  selectedVehicle4: any
  totalVehicles: any[] = []
  total: number | undefined;
  isNetError: boolean = false;
  isDisabledState: boolean = true;
  isDisabledVehicle1: boolean = false;
  isDisabledVehicle2: boolean = false;
  isDisabledVehicle3: boolean = false;
  isDisabledVehicle4: boolean = false;
  isSpinnerDisabled: boolean = false;
  afterSelectPlanet1: boolean = true;
  afterSelectPlanet2: boolean = true;
  afterSelectPlanet3: boolean = true;
  afterSelectPlanet4: boolean = true;
  isdefaultSelect: boolean = true;
  isFindFalcone: boolean = false;
  timeTaken: any = []
  totalTimeTaken: any = []
  token: any;
  planetFound: any;
  isNotFound: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getPlanets()
    this.getToken()
    this.welcomeMsg = 'Welcome To Finding Falcone,'
    this.description = 'Select planets you want to search Falcone in, starting from Planet 1'
  }

  getPlanets() {
    this.isSpinnerDisabled = true
    let planetUrl = 'https://findfalcone.herokuapp.com/planets'
    this.http.get(planetUrl)
      .subscribe((res: any) => {
        this.isSpinnerDisabled = false
        this.getplanet.push(res)
        console.log(this.getplanet)
        this.getplanet.forEach(element => {
          element.forEach((item: { name: string; }) => {
            this.planets.push(item.name)
          });
        })
      }, error => {
        this.isSpinnerDisabled = false
        console.log(error);
        if (error.error.message != 'undefined') {
          this.welcomeMsg = 'Please Check your connection or Try later!'
          this.description = 'If already connected, please refresh!'
          this.isNetError = true
        }
      }


      );
  }
  getVehicles() {
    this.isSpinnerDisabled = true
    let vehicleUrl = 'https://findfalcone.herokuapp.com/vehicles'
    this.http.get(vehicleUrl)
      .subscribe((response: any) => {
        response.forEach((element: any) => {
          this.isSpinnerDisabled = false
          this.vehicleNames.push(element)
          this.totalVehicles.push(element.total_no)
        });
      }, error => {
        this.isSpinnerDisabled = false
        console.log(error);
        if (error.error.message != 'undefined') {
          this.description = 'Please Check your connection or Try later!'
          this.isNetError = true
        }
      })
  }
  planetChanged() {
    if (this.vehicleNames.length == 0) {
      this.getVehicles()
    }
    this.planetTwo = [...this.planets];
    this.planetThree = [...this.planetTwo]
    this.planetFour = [...this.planetThree]
    this.planetTwo = this.planetTwo.filter((i) => (this.selectedPlanet1.indexOf(i) === -1))
    this.planetThree = this.planetThree.filter((i) => (this.selectedPlanet1.indexOf(i) === -1))
    this.planetFour = this.planetFour.filter((i) => (this.selectedPlanet1.indexOf(i) === -1))
    if (this.selectedPlanet1) {
      this.description = "Now Select Vehicles you want to send, to search AI Falcone"
    }
    if (this.selectedPlanet2) {
      this.planetThree = this.planetThree.filter((i) => (this.selectedPlanet2.indexOf(i) === -1))
      this.planetFour = this.planetFour.filter((i) => (this.selectedPlanet2.indexOf(i) === -1))
      if (this.selectedVehicle1.total_no == 0 || this.selectedVehicle2.total_no == 0) {
        this.vehicleNames = this.vehicleNames.filter(({ total_no }) => total_no != 0);
      }
    }
    if (this.selectedPlanet3) {
      this.planetFour = this.planetFour.filter((i) => (this.selectedPlanet3.indexOf(i) === -1))
      if (this.selectedVehicle3.total_no == 0) {
        this.vehicleNames = this.vehicleNames.filter(({ total_no }) => total_no != 0);
      }
    }


  }
  vehicleChanged1() {
    if (this.selectedVehicle1 && this.selectedVehicle1.total_no > 0) {
      this.selectedVehicle1.total_no -= 1
      this.isDisabledVehicle1 = true
      this.afterSelectPlanet1 = false
      let distance = this.selectedVehicle1.max_distance
      let speed = this.selectedVehicle1.speed
      this.totalTimeTaken = distance / speed
      this.timeTaken.push(this.totalTimeTaken)
    } else if (this.selectedVehicle1.total_no == 0) {
      this.isDisabledVehicle1 = true
      this.isDisabledVehicle2 = true
    }
  }
  vehicleChanged2() {
    if (this.selectedVehicle2 && this.selectedVehicle2.total_no > 0) {
      this.selectedVehicle2.total_no -= 1
      this.isDisabledVehicle2 = true
      this.afterSelectPlanet2 = false
      let distance = this.selectedVehicle2.max_distance
      let speed = this.selectedVehicle2.speed
      let time = distance / speed
      this.totalTimeTaken += time
      this.timeTaken = []
      this.timeTaken.push(this.totalTimeTaken)

    }
  }
  vehicleChanged3() {
    if (this.selectedVehicle3 && this.selectedVehicle3.total_no > 0) {
      this.selectedVehicle3.total_no -= 1
      this.afterSelectPlanet3 = false
      let distance = this.selectedVehicle3.max_distance
      let speed = this.selectedVehicle3.speed
      let time = distance / speed
      this.totalTimeTaken += time
      this.timeTaken = []
      this.timeTaken.push(this.totalTimeTaken)
    }
  }
  vehicleChanged4() {
    if (this.selectedVehicle4 && this.selectedVehicle4.total_no > 0) {
      this.selectedVehicle4.total_no -= 1
      this.afterSelectPlanet4 = false
      let distance = this.selectedVehicle4.max_distance
      let speed = this.selectedVehicle4.speed
      let time = distance / speed
      this.totalTimeTaken += time
      this.timeTaken = []
      this.timeTaken.push(this.totalTimeTaken)
    }
  }
  reset() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getToken() {
    const headers = { 'Accept': 'application/json' };
    const body = {};
    let getTokenUrl = 'https://findfalcone.herokuapp.com/token'
    this.http.post<any>(getTokenUrl, body, { headers }).subscribe((res) => {
      this.token = res.token
    },
      error => {
        console.log(error);
      })
  }
  findFalcone() {
    let planets = [this.selectedPlanet1, this.selectedPlanet2, this.selectedPlanet3, this.selectedPlanet4]
    let vehicles = [this.selectedVehicle1.name, this.selectedVehicle2.name, this.selectedVehicle3.name, this.selectedVehicle4.name]
    let params = {
      'token': this.token,
      'planet_names': planets,
      'vehicle_names': vehicles
    }
    const headers = { 'Accept': 'application/json' };
    let findUrl = 'https://findfalcone.herokuapp.com/find'
    console.log(params);
    this.isSpinnerDisabled = true
    this.http.post<any>(findUrl, params, { headers }).subscribe((res) => {
      console.log(res)
      this.isSpinnerDisabled = false
      if (res.status == "success") {
        this.isdefaultSelect = false
        this.isFindFalcone = true
        this.planetFound = res.planet_name
      } else if (res.status == "false") {
        this.isdefaultSelect = false
        this.isFindFalcone = false
        this.isNotFound = true
      } else {
        this.isdefaultSelect = false
        this.isFindFalcone = false
        this.planetFound = "Please try after sometime!"
      }
    },
      error => {
        this.isSpinnerDisabled = false
        console.log(error);
        if (error.error.message != 'undefined') {
          this.isNetError = true
          this.timeTaken = []
          this.timeTaken.push('NA : Please Check your connection or Try later!')
        }
      })
  }

}
