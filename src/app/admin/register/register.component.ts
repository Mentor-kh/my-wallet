import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;

  public constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  public register(): void {
    if (this.registerForm.valid) {
      const email: string = this.registerForm.controls.email.value;
      const password: string = this.registerForm.controls.password.value;
      this.authService.register(email, password);
    }
  }
}
