import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import logo from "../assets/ibridge.png";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="page">
      <header className="dashHeader">
        <div className="brand">
          <Link to="/" className="brandLink" title="Voltar para Home">
            <img src={logo} alt="iBridge" className="brandLogo" />
          </Link>

          <div className="brandText">
            <p className="brandSub">Resumo e rankings de fechamentos</p>
          </div>
        </div>

        <nav className="dashNav">
          <NavLink
            to="/dashboard/resumo"
            className={({ isActive }) =>
              isActive ? "dashNavItem active" : "dashNavItem"
            }
          >
            Resumo
          </NavLink>
          <NavLink
            to="/dashboard/top-operadores"
            className={({ isActive }) =>
              isActive ? "dashNavItem active" : "dashNavItem"
            }
          >
            Operadores
          </NavLink>
          <NavLink
            to="/dashboard/top-listas"
            className={({ isActive }) =>
              isActive ? "dashNavItem active" : "dashNavItem"
            }
          >
            Listas
          </NavLink>
          <NavLink
            to="/dashboard/top-campanhas"
            className={({ isActive }) =>
              isActive ? "dashNavItem active" : "dashNavItem"
            }
          >
            Campanhas
          </NavLink>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
