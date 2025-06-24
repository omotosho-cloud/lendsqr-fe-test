import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { fetchUsers } from "../../services/api/users";
import type { User } from "../../types/user";
import "./Users.scss";

// Import icons
import usersIcon from "../../assets/images/icon (7).svg";
import userCheckIcon from "../../assets/images/icon (2).svg";
import loansIcon from "../../assets/images/icon (3).svg";
import savingsIcon from "../../assets/images/icon (4).svg";
import filterIcon from "../../assets/images/filter-results-button.svg";
import viewIcon from "../../assets/images/np_view_1214519_000000 1.svg";
import blacklistIcon from "../../assets/images/np_delete-friend_3248001_000000 1.svg";
import activateIcon from "../../assets/images/np_user_2995993_000000 1.svg";

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState<string | null>(
    null
  );
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Filter users based on search term and status
  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status--active";
      case "inactive":
        return "status--inactive";
      case "pending":
        return "status--pending";
      case "blacklisted":
        return "status--blacklisted";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleFilterDropdown = (column: string) => {
    setShowFilterDropdown(showFilterDropdown === column ? null : column);
  };

  const toggleActionMenu = (userId: string) => {
    setActiveActionMenu(activeActionMenu === userId ? null : userId);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="users">
          <div className="loading">Loading users...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="users">
          <div className="error">Error loading users. Please try again.</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="users">
        <h1>Users</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={usersIcon} alt="Users" />
            </div>
            <div className="stat-card__label">Users</div>
            <div className="stat-card__value">
              {users.length.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={userCheckIcon} alt="Active Users" />
            </div>
            <div className="stat-card__label">Active Users</div>
            <div className="stat-card__value">
              {users
                .filter((u: User) => u.status === "Active")
                .length.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={loansIcon} alt="Users with Loans" />
            </div>
            <div className="stat-card__label">Users with Loans</div>
            <div className="stat-card__value">
              {users
                .filter((u: User) => u.educationEmployment.loanRepayment > 0)
                .length.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">
              <img src={savingsIcon} alt="Users with Savings" />
            </div>
            <div className="stat-card__label">Users with Savings</div>
            <div className="stat-card__value">
              {users
                .filter((u: User) => u.bankBalance > 50000)
                .length.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <div className="table-header">
                    <span>Organization</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("organization")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "organization" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Organization</label>
                          <select>
                            <option>Select</option>
                            <option>Lendsqr</option>
                            <option>Irorun</option>
                            <option>Lendstar</option>
                          </select>
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <span>Username</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("username")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "username" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Username</label>
                          <input type="text" placeholder="User" />
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <span>Email</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("email")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "email" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Email</label>
                          <input type="email" placeholder="Email" />
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <span>Phone Number</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("phone")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "phone" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Phone Number</label>
                          <input type="tel" placeholder="Phone Number" />
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <span>Date Joined</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("date")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "date" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Date</label>
                          <input type="date" />
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <span>Status</span>
                    <button
                      className="filter-btn"
                      onClick={() => toggleFilterDropdown("status")}
                    >
                      <img src={filterIcon} alt="Filter" />
                    </button>
                    {showFilterDropdown === "status" && (
                      <div className="filter-dropdown">
                        <div className="filter-form">
                          <label>Status</label>
                          <select>
                            <option>Select</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Pending</option>
                            <option>Blacklisted</option>
                          </select>
                          <div className="filter-actions">
                            <button className="btn-reset">Reset</button>
                            <button className="btn-filter">Filter</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user: User) => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  className="clickable-row"
                >
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatDate(user.dateJoined)}</td>
                  <td>
                    <span className={`status ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="actions">
                      <button
                        className="action-menu-btn"
                        onClick={() => toggleActionMenu(user.id)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                      {activeActionMenu === user.id && (
                        <div className="action-menu">
                          <Link
                            to={`/users/${user.id}`}
                            className="action-item"
                          >
                            <img
                              src={viewIcon}
                              alt="View Details"
                              className="action-icon"
                            />
                            <span>View Details</span>
                          </Link>
                          <button className="action-item">
                            <img
                              src={blacklistIcon}
                              alt="Blacklist User"
                              className="action-icon"
                            />
                            <span>Blacklist User</span>
                          </button>
                          <button className="action-item">
                            <img
                              src={activateIcon}
                              alt="Activate User"
                              className="action-icon"
                            />
                            <span>Activate User</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="items-per-page"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>out of {filteredUsers.length}</span>
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn--sm"
            >
              {"<"}
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`btn btn--sm ${
                    currentPage === page ? "btn--primary" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn--sm"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
