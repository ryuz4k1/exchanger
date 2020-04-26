import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public validateForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
  }


  login() {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value.username).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/']).then();
      });
    }
  }

}
