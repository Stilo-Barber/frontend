import React, { useState, useEffect } from "react";
import { Main, Logo, Input, Btn, Create, Body } from "./styles";
import ImgLogo from "../../assets/images/logo.png";
import history from "../../services/history";
import { useSelector, useDispatch } from "react-redux";
import { signInRequest, signOut } from "../../store/modules/auth/actions";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth);

  const requestLogin = (ev) => {
    ev.preventDefault();
    if (email && password) {
      dispatch(signInRequest(email, password));
    }
  };

  useEffect(() => {
    if (error.signedFailured) {
      dispatch(signOut());
      Swal.fire("Oops...", "Você errou o usuário e/ou senha", "error");
    }
  }, [error]);

  return (
    <Main>
      <form onSubmit={requestLogin}>
        <Body>
          <Logo src={ImgLogo} />
          <Input
            name="email"
            label="Email"
            type="email"
            required
            valeu={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            required
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Btn variant="outlined" type="submit">
            Entrar
          </Btn>
          <Create onClick={() => history.push("/register")}>
            Criar uma conta!
          </Create>
        </Body>
      </form>
    </Main>
  );
};

export default Login;
