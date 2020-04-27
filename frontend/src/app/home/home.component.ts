import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loading$ = this.authService.loading$;
  public validateForm: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
  });

  public results: Observable<any[]>;
  
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
  }



  public async login() {

    let access_token = this.activatedRoute.snapshot.paramMap.get('access_token');
    let refresh_token = this.activatedRoute.snapshot.paramMap.get('refresh_token');
    console.log("Access Token --> ", access_token);
    console.log("Refresh Token --> ", refresh_token);

    if (this.validateForm.valid) {

      this.authService.url(this.validateForm.value.url, access_token, refresh_token).subscribe(data => {
        console.log(data)
        this.router.navigate(['/result']).then();
        }, err => {
        console.log(err);
      })
    }
    else{
      alert("Fill url")
    }
  }

}
