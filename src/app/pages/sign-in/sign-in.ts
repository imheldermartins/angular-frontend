import { Component, signal } from '@angular/core';

import { Typography } from '../../components/typography/typography';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
// import { NgClass } from '@angular/common';

interface SignInForm {
  email: string;
  password: string;
}

@Component({
  imports: [FormField, Typography, Button, FormRoot, Input],
  templateUrl: './sign-in.html',
})
export class SignIn {
  formModel = signal<SignInForm>({
    email: '',
    password: '',
  });

  formData = form<SignInForm>(
    this.formModel,
    (schema) => {
      email(schema.email, { message: 'Endereço de email inválido' });
      required(schema.email, { message: 'Email é obrigatório' });

      required(schema.password, { message: 'Senha é obrigatória' });
    },
    {
      submission: {
        action: async (field) => {
          const data = await field();

          console.log(data.value());

          return { kind: 'serverError', message: 'Credencias inválidas' };
        },
      },
    },
  );
}
