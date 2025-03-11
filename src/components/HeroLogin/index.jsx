import React from "react";
import "./style.css";
import womanImage from "../../assets/Womanimage.png";
import logo from "../../assets/logo04.png";
import { useNavigate } from "react-router";


const HeroLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="login-wrapper">
        <img src={logo} alt="Habita Recife Logo" className="Logo_login" />
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Insira aqui seu email..." />

          <label>Senha:</label>
          <input type="password" placeholder="Insira aqui sua senha..." />

          <p className="forgot-password">Esqueceu a senha? <a href="#">Clique aqui</a> para recuperar</p>
          
          <button type="submit">Entrar!</button>

          <p className="register-link">Não tem cadastro? <a  className="Cadastro" onClick={()=> console.log('Clicou')}>Faça seu Cadastro</a></p>
        </form>
      </div>

      <div className="hero-text">
        <h1 className="hero_title">Bem-vindo ao Hábita Recife!</h1>
        <p>
          Gerencie seu condomínio de forma eficiente e prática. <br />
          Acompanhe avisos, notificações e novidades em um só lugar.
        </p>
        <div className="DivMulher">
          <img className="Mulher" src={womanImage} alt="Mulher ilustrativa" />
        </div>
      </div>

      
    </div>
  );
};

export default HeroLogin;
