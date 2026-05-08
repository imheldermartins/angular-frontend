import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { email, form, FormRoot, required } from '@angular/forms/signals';

import { Typography } from '../../components/typography/typography';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { firstValueFrom } from 'rxjs';

interface SignInForm {
  email: string;
  password: string;
}

@Component({
  imports: [Typography, Button, FormRoot, Input],
  templateUrl: './sign-in.html',
})
export class SignIn {
  private http: HttpClient = inject(HttpClient);

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
          const payload = data.value();

          try {
            const response = await firstValueFrom(
              this.http.get('https://jsonplaceholder.typicode.com/todos/1'),
            );

            if (response) {
              console.log('API Response: ', response);
            }
          } catch (error) {
            console.error('ERROR API: ', error);
          }

          return { kind: 'serverError', message: 'Credencias inválidas' };
        },
      },
    },
  );
}
