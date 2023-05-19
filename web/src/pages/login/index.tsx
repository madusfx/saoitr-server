import { useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';
import api from "../../services/api";
import { login } from '@/services/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';

import * as S from './styles';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password.length > 0 ? md5(password) : null
    };
    axios
    api.post("/login", userData)
      .then((response) => {
        login(response.data.token);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <S.Card>
      <S.Title>
        Login
      </S.Title>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='E-mail' value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Senha' value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <Button type='submit'>
          Entrar
        </Button>
        <S.Register>
          Não tem uma conta? <div onClick={() => router.push('/cadastro')}>Clique aqui!</div>
        </S.Register>
      </form>
    </S.Card>
  )
}