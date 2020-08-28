import React, { useState } from "react";
import { Main, Body, Input, Btn, Create } from "./styles";
import history from "../../services/history";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Login = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const insertUser = async (ev) => {
    ev.preventDefault();

    const data = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };

    try {
      await api.post("/register", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      Swal.fire("Muito Bem!", "Agora você já pode fazer login", "success");
      history.push("./login");
    } catch (err) {
      setLoading(false);
      if (err.response.data) {
        Swal.fire("Que pena!", ` ${err.response.data}`, "error");
      } else {
        Swal.fire(
          "Que pena!",
          "Não foi possível criar seu cadastro, tente novamente mais tarde",
          "error"
        );
      }
    }
  };

  return (
    <Main>
      <form onSubmit={insertUser}>
        <Body>
          <Input
            name="name"
            label="Seu nome"
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <Input
            name="phone"
            label="telefone"
            type="number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            required
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <Input
            name="confirmPassword"
            label="Confirme a senha"
            type="password"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            required
          />
          <Btn variant="outlined" type="submit">
            Cadastrar
          </Btn>
          <Create onClick={() => history.push("/login")}>
            Já possui conta? Fazer login!
          </Create>
        </Body>
      </form>
    </Main>
  );
};

export default Login;
