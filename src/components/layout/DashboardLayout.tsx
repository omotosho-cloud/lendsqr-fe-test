import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./DashboardLayout.scss";

// Import icons
import logo from "../../assets/images/logo.png";
import homeIcon from "../../assets/images/home 1.png";
import usersIcon from "../../assets/images/user-friends 1.svg";
import guarantorsIcon from "../../assets/images/users 1.svg";
import loansIcon from "../../assets/images/handshake-regular 1.svg";
import decisionModelsIcon from "../../assets/images/user-check 1.svg";
import savingsIcon from "../../assets/images/piggy-bank 1.svg";
import loanRequestsIcon from "../../assets/images/handshake-regular 1.svg";
import whitelistIcon from "../../assets/images/user-check 1.svg";
import karmaIcon from "../../assets/images/user-times 1.svg";
import organizationIcon from "../../assets/images/briefcase 1 (1).svg";
import loanProductsIcon from "../../assets/images/handshake-regular 1.svg";
import savingsProductsIcon from "../../assets/images/coins-solid 1.svg";
import feesChargesIcon from "../../assets/images/coins-solid 1.svg";
import transactionsIcon from "../../assets/images/galaxy 1.svg";
import servicesIcon from "../../assets/images/user-cog 1.svg";
import serviceAccountIcon from "../../assets/images/scroll 1.svg";
import settlementsIcon from "../../assets/images/clipboard-list 1.svg";
import reportsIcon from "../../assets/images/clipboard-list 1.svg";
import preferencesIcon from "../../assets/images/sliders-h 1.svg";
import feesIcon from "../../assets/images/badge-percent 1.svg";
import auditLogsIcon from "../../assets/images/clipboard-list 1.svg";
import notificationIcon from "../../assets/images/np_notification_2425223_000000 1.svg";
import dropdownIcon from "../../assets/images/np_next_2236826_000000 2.svg";
import searchIcon from "../../assets/images/Vector.svg";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    // Exact match for most paths
    if (location.pathname === path) {
      return true;
    }

    // Special case for users path - also active on user details pages
    if (path === "/users" && location.pathname.startsWith("/users/")) {
      return true;
    }

    return false;
  };

  const navigationItems = [
    {
      section: "CUSTOMERS",
      items: [
        { path: "/users", label: "Users", icon: usersIcon },
        { path: "/guarantors", label: "Guarantors", icon: guarantorsIcon },
        { path: "/loans", label: "Loans", icon: loansIcon },
        {
          path: "/decision-models",
          label: "Decision Models",
          icon: decisionModelsIcon,
        },
        { path: "/savings", label: "Savings", icon: savingsIcon },
        {
          path: "/loan-requests",
          label: "Loan Requests",
          icon: loanRequestsIcon,
        },
        { path: "/whitelist", label: "Whitelist", icon: whitelistIcon },
        { path: "/karma", label: "Karma", icon: karmaIcon },
      ],
    },
    {
      section: "BUSINESSES",
      items: [
        {
          path: "/organization",
          label: "Organization",
          icon: organizationIcon,
        },
        {
          path: "/loan-products",
          label: "Loan Products",
          icon: loanProductsIcon,
        },
        {
          path: "/savings-products",
          label: "Savings Products",
          icon: savingsProductsIcon,
        },
        {
          path: "/fees-charges",
          label: "Fees and Charges",
          icon: feesChargesIcon,
        },
        {
          path: "/transactions",
          label: "Transactions",
          icon: transactionsIcon,
        },
        { path: "/services", label: "Services", icon: servicesIcon },
        {
          path: "/service-account",
          label: "Service Account",
          icon: serviceAccountIcon,
        },
        { path: "/settlements", label: "Settlements", icon: settlementsIcon },
        { path: "/reports", label: "Reports", icon: reportsIcon },
      ],
    },
    {
      section: "SETTINGS",
      items: [
        { path: "/preferences", label: "Preferences", icon: preferencesIcon },
        { path: "/fees-pricing", label: "Fees and Pricing", icon: feesIcon },
        { path: "/audit-logs", label: "Audit Logs", icon: auditLogsIcon },
      ],
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <div className="mobile-header">
        <button
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="mobile-logo">
          <img src={logo} alt="Lendsqr" />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="dashboard-layout__overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-layout__sidebar ${sidebarOpen ? "open" : ""}`}
      >
        <div className="logo">
          <img src={logo} alt="Lendsqr" />
        </div>

        <nav className="nav-menu">
          {/* Switch Organisation */}
          <div className="nav-section">
            <div className="switch-organisation">
              <button
                className="switch-org-btn"
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              >
                <img
                  src={organizationIcon}
                  alt="Organisation"
                  className="icon"
                />
                <span className="label">Switch Organisation</span>
                <img
                  src={dropdownIcon}
                  alt="Dropdown"
                  className={`dropdown-icon ${orgDropdownOpen ? "open" : ""}`}
                />
              </button>
              {orgDropdownOpen && (
                <div className="org-dropdown">
                  <div className="org-item">Lendsqr</div>
                  <div className="org-item">Irorun</div>
                  <div className="org-item">Lendstack</div>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard */}
          <div className="nav-section">
            <Link
              to="/dashboard"
              className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
            >
              <img src={homeIcon} alt="Dashboard" className="icon" />
              <span className="label">Dashboard</span>
            </Link>
          </div>

          {/* Navigation sections */}
          {navigationItems.map((section) => (
            <div key={section.section} className="nav-section">
              <div className="nav-section__title">{section.section}</div>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                >
                  <img src={item.icon} alt={item.label} className="icon" />
                  <span className="label">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-layout__main">
        {/* Header */}
        <header className="header">
          <div className="search-bar">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search for anything" />
              <button type="submit">
                <img src={searchIcon} alt="Search" />
              </button>
            </form>
          </div>

          <div className="user-menu">
            <a href="#" className="docs-link">
              Docs
            </a>
            <div className="notifications">
              <img
                src={notificationIcon}
                alt="Notifications"
                className="icon"
              />
              <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span className="name">Adedeji</span>
              <img src={dropdownIcon} alt="Menu" className="dropdown-arrow" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
