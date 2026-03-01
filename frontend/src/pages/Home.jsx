import { Link } from "react-router-dom";
import { BarChart3, Users, ListChecks, Megaphone } from "lucide-react";
import logo from "../assets/ibridge.png";

export default function Home() {
  return (
    <div className="page">
      <div className="home">
        <img src={logo} alt="iBridge" className="homeLogo" />

        <h1 className="homeTitle">Painéis iBridge</h1>
        <p className="homeSubtitle">Selecione um dashboard</p>

        <div className="cards">
          <Link className="cardLink cardBig" to="/dashboard/resumo">
            <span className="cardLeft">
              <BarChart3 size={20} />
              <span>Resumo por Lista</span>
            </span>
          </Link>

          <Link className="cardLink cardBig" to="/dashboard/top-operadores">
            <span className="cardLeft">
              <Users size={20} />
              <span>Top Operadores</span>
            </span>
          </Link>

          <Link className="cardLink cardBig" to="/dashboard/top-listas">
            <span className="cardLeft">
              <ListChecks size={20} />
              <span>Top Listas</span>
            </span>
          </Link>

          <Link className="cardLink cardBig" to="/dashboard/top-campanhas">
            <span className="cardLeft">
              <Megaphone size={20} />
              <span>Top Campanhas</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
