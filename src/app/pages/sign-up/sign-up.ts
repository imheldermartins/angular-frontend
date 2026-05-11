import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { email, Field, form, FormRoot, minLength, required } from '@angular/forms/signals';

import { Typography } from '../../components/typography/typography';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { firstValueFrom } from 'rxjs';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 1 | 2 | 3;
  birthDate?: string | undefined;
}

@Component({
  imports: [Typography, Button, FormRoot, Input],
  templateUrl: './sign-up.html',
})
export class SignUp {
  successMessage = signal<string>('');

  private http: HttpClient = inject(HttpClient);

  inputFields: { type: any; label: string; placeholder: string; fieldName: keyof SignUpForm }[] = [
    { type: 'text', label: 'Nome', placeholder: 'ex. Helder', fieldName: 'firstName' },
    { type: 'text', label: 'Sobrenome', placeholder: 'ex. Martins', fieldName: 'lastName' },
    { type: 'email', label: 'E-mail', placeholder: 'ex. seu@email.com', fieldName: 'email' },
    { type: 'password', label: 'Senha', placeholder: 'ex. ••••••••', fieldName: 'password' },
    { type: 'number', label: 'Gênero', placeholder: 'ex. M: 1, F: 2 e O: 3', fieldName: 'gender' },
    {
      type: 'text',
      label: 'Data de Nascimento',
      placeholder: '00/00/0000',
      fieldName: 'birthDate',
    },
  ];

  formModel = signal<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 3,
    birthDate: '',
  });

  formData = form<SignUpForm>(
    this.formModel,
    (schema) => {
      required(schema.firstName, { message: 'Nome é obrigatório' });
      required(schema.lastName, { message: 'Sobrenome é obrigatório' });

      email(schema.email, { message: 'Endereço de email inválido' });
      required(schema.email, { message: 'Email é obrigatório' });

      required(schema.password, { message: 'Senha é obrigatória' });
      minLength(schema.password, 8, { message: 'A senha deve conter no mínimo 8 caracteres' });

      required(schema.gender, { message: 'Sobrenome é obrigatório' });
    },
    {
      submission: {
        action: async (field) => {
          const rawPayload = await field().value();

          const processedPayload = { ...rawPayload };

          if (processedPayload.birthDate) {
            const dateParts = processedPayload.birthDate.split('/');

            // Verifica se tem 3 partes (dia, mês e ano) para evitar quebrar com inputs inválidos
            if (dateParts.length === 3) {
              const [day, month, year] = dateParts;
              // Remonta no formato ISO 8601 exigido pelo seu backend do C#/SQL Server
              processedPayload.birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.0000000Z`;
            }
          }

          const payload = Object.fromEntries(
            Object.entries(processedPayload).filter(
              ([_, value]) => value !== '' && value !== null && value !== undefined,
            ),
          );

          try {
            const response = await firstValueFrom(
              this.http.post('http://localhost:5171/api/v1/users/', payload),
            );

            if (!response) throw new Error('User not registered.');

            /**
             * Redirects user from sign-up, to sign-in to get auth-token
             */
            console.log('success', response);
            this.successMessage.set(
              `Usuário cadastrado com sucesso, bem vindo ${(response as any).firstName}!`,
            );

            return;
          } catch ({ error }: any) {
            const errorsStack = typeof error === 'object' ? error : error.errors;

            return {
              kind: 'serverError',
              message: `${Object.entries(errorsStack)
                .map(([key, values]) => `[${key}] ${(values as string[]).join(', ')}`)
                .join(';')}`,
            };
          }
        },
      },
    },
  );

  public getFormField(fieldName: string) {
    return (this.formData as any)[fieldName] as Field<string>;
  }

  public formatErrorMessages(message: string | string[]): string[] {
    const msgString = Array.isArray(message) ? message.join(';') : message;

    if (!msgString) return [];

    return msgString
      .split(';')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);
  }
}
