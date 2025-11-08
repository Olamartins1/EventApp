import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import "./SignupIndividual.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import VerificationModal from "../../../components/static/VerificationModal/VerificationModal";

const SignupIndividual = () => {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }

    if (!formData.surname.trim()) {
      toast.error("Surname is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/register-client",
        formData
      );

      toast.success("Signup successful:", response.data);
      localStorage.setItem("signupEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);

      setIsVerificationOpen(true);
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container-ind">
      <ToastContainer position="top-right" autoClose={3000} />
      {isVerificationOpen && (
        <VerificationModal
          onClose={() => setIsVerificationOpen(false)}
          email={formData.email}
        />
      )}
      <div className="left-section2">
        <div
          className="bg-image2"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/depuy7bkr/image/upload/v1761918819/left_side_client_eventiQ2_z4aumq.png')",
          }}
        ></div>

        <button
          className="back-btn2"
          onClick={() => navigate("/", { replace: true })}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="left-content2">
          <div className="badge2">FOR CLIENTS</div>
          <h1>
            Book Spaces <br /> You'll Love.
          </h1>
          <p>
            Find and book the perfect hall and services for your next event,
            fast and easy.
          </p>
        </div>
      </div>

      <div className="right-section2">
        <div className="form-wrapper2">
          <div className="form-header2">
            <LuUser className="user-icon2" size={30} />
            <div className="form-header-text2">
              <h2>Client </h2>
              <p className="form-subtitle2">
                Create your account to get started
              </p>
            </div>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            <div className="two-cols-ind">
              <div className="input-group1-ind">
                <label>
                  <User size={14} className="label-icon" /> First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
                )}
              </div>

              <div className="input-group2-ind">
                <label>
                  <User size={14} className="label-icon" /> Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Doe"
                />
                {errors.surname && (
                  <p className="error-text">{errors.surname}</p>
                )}
              </div>
            </div>

            <div className="input-group-email-ind">
              <label>
                <Mail size={14} className="label-icon" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@example.com"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="input-group-ind password-field-ind">
              <label>
                <Lock size={14} className="label-icon-ind" /> Password
              </label>
              <div className="password-box-ind">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="checkbox-group-ind1">
              <label>
                I have read the <a href="#">Terms and Conditions</a> and I agree
                to it
              </label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
            </div>
            {errors.termsAccepted && (
              <p className="error-text">{errors.termsAccepted}</p>
            )}

            <button
              className="submit-btn-ind"
              style={{ background: "#603379" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="login-text-client">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>

          <div className="security-note-ind">
            <ShieldCheck size={14} color="#10B981" />
            <span>Secure and encrypted platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupIndividual;
// osi
