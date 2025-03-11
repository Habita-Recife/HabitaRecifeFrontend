
import "./style.css";
import logo from "../../assets/Habitarecifelogo01.png";

const FooterLogin = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Habita Recife Logo" className="footer-logo" />
        <p className="footer-text">Habita Recife - Conectando moradores e administradores</p>
      </div>
    </footer>
  );
};

export default FooterLogin;