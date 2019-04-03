import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    title.setTitle('Enter to system');
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Now you can log in!',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'To work with the system you need to log in!',
            type: 'warning'
          });
        }
      });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        if (users.find(u => u.email === formData.email)) {
          if (users.find(u => u.password === formData.password)) {
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/system']);
          } else {
            this.showMessage({
              text: 'Incorrect password.',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'No such user exists.',
            type: 'danger'
          });
        }
      });
  }
}
