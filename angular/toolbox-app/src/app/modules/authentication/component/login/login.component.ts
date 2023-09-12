import {Component, inject} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'dgt-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
}