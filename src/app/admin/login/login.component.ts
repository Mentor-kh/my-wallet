import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  public ngOnInit(): void {

  }

  public submit(): void {
    if (this.loginForm.valid) {
      const email: string = this.loginForm.controls.email.value;
      const password: string = this.loginForm.controls.password.value;
      this.authService.login(email, password);
    }
  }
}
