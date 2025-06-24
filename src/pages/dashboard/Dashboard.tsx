import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./Dashboard.scss";

// Import icons
import usersIcon from "../../assets/images/icon (7).svg";
import userCheckIcon from "../../assets/images/icon (2).svg";
import loansIcon from "../../assets/images/icon (3).svg";
import savingsIcon from "../../assets/images/icon (4).svg";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <h1>Dashboard</h1>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Link to="/users" className="stat-card" style={{ textDecoration: 'none' }}>
            <div className="stat-card__icon">
              <img src={usersIcon} alt="Users" />
            </div>
            <div className="stat-card__label">Users</div>
            <div className="stat-card__value">2,453</div>
          </Link>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={userCheckIcon} alt="Active Users" />
            </div>
            <div className="stat-card__label">Active Users</div>
            <div className="stat-card__value">2,453</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={loansIcon} alt="Users with Loans" />
            </div>
            <div className="stat-card__label">Users with Loans</div>
            <div className="stat-card__value">12,453</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={savingsIcon} alt="Users with Savings" />
            </div>
            <div className="stat-card__label">Users with Savings</div>
            <div className="stat-card__value">102,453</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/users" className="action-button">
              <div className="icon">
                <img src={usersIcon} alt="View Users" />
              </div>
              <div className="label">View All Users</div>
            </Link>
            <button className="action-button">
              <div className="icon">
                <img src={userCheckIcon} alt="Add User" />
              </div>
              <div className="label">Add New User</div>
            </button>
            <button className="action-button">
              <div className="icon">
                <img src={loansIcon} alt="Loan Management" />
              </div>
              <div className="label">Loan Management</div>
            </button>
            <button className="action-button">
              <div className="icon">
                <img src={savingsIcon} alt="Savings" />
              </div>
              <div className="label">Savings Overview</div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
