import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  fetchUserById,
  storeUserInLocalStorage,
  getUserFromLocalStorage,
} from "../../services/api/users";
import type { User } from "../../types/user";
import "./UserDetails.scss";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const loadUser = async () => {
      if (!id) {
        setError("User ID not provided");
        setIsLoading(false);
        return;
      }

      try {
        // First, try to get user from localStorage
        const cachedUser = getUserFromLocalStorage(id);

        if (cachedUser) {
          setUser(cachedUser);
          setIsLoading(false);
        } else {
          // If not in localStorage, fetch from API
          const fetchedUser = await fetchUserById(id);

          if (fetchedUser) {
            setUser(fetchedUser);
            // Store in localStorage for future access
            storeUserInLocalStorage(fetchedUser);
          } else {
            setError("User not found");
          }
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error loading user details");
        setIsLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleStatusChange = (newStatus: User["status"]) => {
    if (user) {
      const updatedUser = { ...user, status: newStatus };
      setUser(updatedUser);
      // Update localStorage
      storeUserInLocalStorage(updatedUser);
    }
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

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={i < tier ? "star filled" : "star"}>
        ⭐
      </span>
    ));
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div className="loading">Loading user details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div className="error">{error || "User not found"}</div>
          <Link to="/users" className="btn btn--primary">
            Back to Users
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="user-details">
        {/* Header */}
        <div className="user-details__header">
          <Link to="/users" className="back-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Users
          </Link>
          <div className="header-content">
            <h1>User Details</h1>
            <div className="header-actions">
              <button
                className="btn btn--outline btn--danger"
                onClick={() => handleStatusChange("Blacklisted")}
              >
                Blacklist User
              </button>
              <button
                className="btn btn--outline btn--success"
                onClick={() => handleStatusChange("Active")}
              >
                Activate User
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="user-profile-card">
          <div className="profile-main">
            <div className="profile-left">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {user.personalInfo.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="profile-info">
                <h2>{user.personalInfo.fullName}</h2>
                <p className="user-id">{user.username}</p>
              </div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-tier">
              <div className="stat-label">User's Tier</div>
              <div className="stars">{renderStars(user.tier)}</div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-balance">
              <div className="balance-amount">
                ₦{user.bankBalance.toLocaleString()}
              </div>
              <div className="bank-info">
                {user.accountNumber}/Providus Bank
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="tabs-nav">
            <button
              className={`tab-button ${
                activeTab === "general" ? "active" : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              General Details
            </button>
            <button
              className={`tab-button ${
                activeTab === "documents" ? "active" : ""
              }`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`tab-button ${activeTab === "bank" ? "active" : ""}`}
              onClick={() => setActiveTab("bank")}
            >
              Bank Details
            </button>
            <button
              className={`tab-button ${activeTab === "loans" ? "active" : ""}`}
              onClick={() => setActiveTab("loans")}
            >
              Loans
            </button>
            <button
              className={`tab-button ${
                activeTab === "savings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("savings")}
            >
              Savings
            </button>
            <button
              className={`tab-button ${activeTab === "app" ? "active" : ""}`}
              onClick={() => setActiveTab("app")}
            >
              App and System
            </button>
          </div>
        </div>

        {/* User Details Content */}
        <div className="user-details-content">
          <div className="tab-content">
            {activeTab === "general" && (
              <div className="details-grid">
                {/* Personal Information */}
                <div className="details-section">
                  <h3>Personal Information</h3>
                  <div className="details-row">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <span>{user.personalInfo.fullName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone Number</label>
                      <span>{user.personalInfo.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email Address</label>
                      <span>{user.personalInfo.emailAddress}</span>
                    </div>
                    <div className="detail-item">
                      <label>BVN</label>
                      <span>{user.personalInfo.bvn}</span>
                    </div>
                    <div className="detail-item">
                      <label>Gender</label>
                      <span>{user.personalInfo.gender}</span>
                    </div>
                    <div className="detail-item">
                      <label>Marital Status</label>
                      <span>{user.personalInfo.maritalStatus}</span>
                    </div>
                    <div className="detail-item">
                      <label>Children</label>
                      <span>{user.personalInfo.children}</span>
                    </div>
                    <div className="detail-item">
                      <label>Type of Residence</label>
                      <span>{user.personalInfo.typeOfResidence}</span>
                    </div>
                  </div>
                </div>

                {/* Education and Employment */}
                <div className="details-section">
                  <h3>Education and Employment</h3>
                  <div className="details-row">
                    <div className="detail-item">
                      <label>Level of Education</label>
                      <span>{user.educationEmployment.levelOfEducation}</span>
                    </div>
                    <div className="detail-item">
                      <label>Employment Status</label>
                      <span>{user.educationEmployment.employmentStatus}</span>
                    </div>
                    <div className="detail-item">
                      <label>Sector of Employment</label>
                      <span>{user.educationEmployment.sectorOfEmployment}</span>
                    </div>
                    <div className="detail-item">
                      <label>Duration of Employment</label>
                      <span>
                        {user.educationEmployment.durationOfEmployment}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Office Email</label>
                      <span>{user.educationEmployment.officeEmail}</span>
                    </div>
                    <div className="detail-item">
                      <label>Monthly Income</label>
                      <span>
                        ₦
                        {user.educationEmployment.monthlyIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Loan Repayment</label>
                      <span>
                        ₦
                        {user.educationEmployment.loanRepayment.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="details-section">
                  <h3>Socials</h3>
                  <div className="details-row">
                    <div className="detail-item">
                      <label>Twitter</label>
                      <span>{user.socials.twitter}</span>
                    </div>
                    <div className="detail-item">
                      <label>Facebook</label>
                      <span>{user.socials.facebook}</span>
                    </div>
                    <div className="detail-item">
                      <label>Instagram</label>
                      <span>{user.socials.instagram}</span>
                    </div>
                  </div>
                </div>

                {/* Guarantor */}
                <div className="details-section">
                  <h3>Guarantor</h3>
                  <div className="details-row">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <span>{user.guarantor.fullName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone Number</label>
                      <span>{user.guarantor.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email Address</label>
                      <span>{user.guarantor.emailAddress}</span>
                    </div>
                    <div className="detail-item">
                      <label>Relationship</label>
                      <span>{user.guarantor.relationship}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="tab-placeholder">
                <p>Documents information will be displayed here.</p>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="tab-placeholder">
                <p>Bank details information will be displayed here.</p>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="tab-placeholder">
                <p>Loans information will be displayed here.</p>
              </div>
            )}

            {activeTab === "savings" && (
              <div className="tab-placeholder">
                <p>Savings information will be displayed here.</p>
              </div>
            )}

            {activeTab === "app" && (
              <div className="tab-placeholder">
                <p>App and System information will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
