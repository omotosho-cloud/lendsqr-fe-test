import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
// Import images
import logo from "../../assets/images/logo.png";
import signInImage from "../../assets/images/sign-in-image.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would validate credentials here
    // For this demo, we'll just navigate to dashboard
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <div className="login__logo">
            <img src={logo} alt="Lendsqr logo" />
          </div>
          <div className="login__illustration">
            <img src={signInImage} alt="Welcome illustration" />
          </div>
        </div>

        <div className="login__right">
          <div className="login__mobile-illustration">
            <img src={signInImage} alt="Login illustration" />
          </div>
          <div className="login__content">
            <h1>Welcome!</h1>
            <p className="login__subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit} className="login__form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>

              <button type="submit" className="btn btn--primary login__submit">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
