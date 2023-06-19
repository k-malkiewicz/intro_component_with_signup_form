import { Component, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupFormComponent {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  errorsCount: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  displayError(inp: HTMLInputElement, msg: string): void {
    const parentEl: HTMLElement = inp.parentElement!;
    this.renderer.addClass(inp.parentElement, 'error');
    this.renderer.setProperty(parentEl.querySelector('small'), 'textContent', msg);
    this.errorsCount++;
  }

  removeError(inp: HTMLInputElement): void {
    const parentEl: HTMLElement = inp.parentElement!;
    this.renderer.removeClass(inp.parentElement, 'error');
  }

  displaySuccess(): void {
    alert('The account has been created!');
    this.fname = '';
    this.lname = '';
    this.email = '';
    this.password = '';
  }

  validateForm(e: Event): void {
    e.preventDefault();
    const fnameInput: HTMLInputElement = this.el.nativeElement.querySelector("input[name='fname']");
    const lnameInput: HTMLInputElement = this.el.nativeElement.querySelector("input[name='lname']");
    const emailInput: HTMLInputElement = this.el.nativeElement.querySelector("input[name='email']");
    const passwordInput: HTMLInputElement = this.el.nativeElement.querySelector("input[name='password']");

    this.errorsCount = 0;

    if (this.fname === '') {
      this.displayError(fnameInput, 'First Name cannot be empty');
    } else {
      this.removeError(fnameInput);
    }

    if (this.lname === '') {
      this.displayError(lnameInput, 'Last Name cannot be empty');
    } else {
      this.removeError(lnameInput);
    }

    if (this.email === '') {
      this.displayError(emailInput, 'Email Address cannot be empty');
    } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi.test(this.email) || this.email.toLowerCase() !== this.email) {
      this.displayError(emailInput, 'Looks like this is not an email');
    } else {
      this.removeError(emailInput);
    }

    if (this.password === '') {
      this.displayError(passwordInput, 'Password cannot be empty');
    } else {
      this.removeError(passwordInput);
    }

    if (this.errorsCount === 0) {
      this.displaySuccess();
    }
  }
}
