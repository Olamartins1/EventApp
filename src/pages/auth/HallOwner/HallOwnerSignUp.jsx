import { useState } from "react";
import axios from "axios";
import "./HallOwnerSignUp.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { LuUser } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationModal from "../../../components/static/VerificationModal/VerificationModal";

const SignupHallOwner = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  // Handle form input
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
        "https://eventiq-final-project.onrender.com/api/v1/venueOwner",
        formData
      );

      console.log("Signup successful:", response.data);
      localStorage.setItem("signupEmail", response.data.data.email);
      localStorage.setItem("userRole", response.data.data.role);

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
    <section className="signup-container-client">
      <ToastContainer position="top-right" autoClose={3000} />
      {isVerificationOpen && (
        <VerificationModal
          onClose={() => setIsVerificationOpen(false)}
          email={formData.email}
        />
      )}

      <div className="left-section1">
        <div
          className="bg-image1"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/depuy7bkr/image/upload/v1761918862/left_side_venue_owner_eventQ3_wb8oaj.png')",
          }}
        ></div>

        <button
          className="back-btn1"
          onClick={() => navigate("/", { replace: true })}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="left-content1">
          <div className="badge1">FOR VENUE OWNERS</div>
          <h1>
            List Your Hall, <br /> Get Booked.
          </h1>
          <p>
            Manage your event halls with ease and get more bookings, all on
            Eventiq.
          </p>
        </div>
      </div>

      <section className="right-section1">
        <div className="form-wrapper1">
          <div className="form-header1">
            <LuUser className="user-icon1" size={30} />
            <div className="form-header-text1">
              <h2>Venue Owner/Manager </h2>
              <p className="form-subtitle1">
                Create your account to get started
              </p>
            </div>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            <div className="two-cols-client">
              <div className="input-group1-client">
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

              <div className="input-group2-client">
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

            <div className="input-group-email-client">
              <label>
                <Mail size={14} className="label-icon" /> Business Email Address
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

            <div className="input-group-client password-field-client">
              <label>
                <Lock size={14} className="label-icon-client" /> Password
              </label>
              <div className="password-box-client">
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

            <div className="checkbox-group-client1">
              <label>
                I have read the{" "}
                <a href="#" style={{ color: "#603379" }}>
                  Terms and Conditions
                </a>{" "}
                and i agree to it
              </label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />{" "}
            </div>
            {errors.termsAccepted && (
              <p className="error-text">{errors.termsAccepted}</p>
            )}

            <button
              className="submit-btn-client"
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

          <div className="security-note-client">
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.1328 2.444C2.44891 2.4152 4.67585 1.54677 6.4 0C8.12403 1.54706 10.351 2.41578 12.6672 2.4448C12.7552 2.9648 12.8 3.5008 12.8 4.0456C12.8 8.2256 10.128 11.7816 6.4 13.0992C2.672 11.7808 0 8.2248 0 4.0448C0 3.4992 0.0455999 2.9648 0.1328 2.444ZM9.3656 5.4104C9.51133 5.25952 9.59196 5.05744 9.59014 4.84768C9.58832 4.63792 9.50418 4.43727 9.35585 4.28895C9.20753 4.14062 9.00688 4.05648 8.79712 4.05466C8.58736 4.05284 8.38528 4.13347 8.2344 4.2792L5.6 6.9136L4.5656 5.8792C4.41472 5.73347 4.21264 5.65284 4.00288 5.65466C3.79312 5.65648 3.59247 5.74062 3.44415 5.88895C3.29582 6.03727 3.21168 6.23792 3.20986 6.44768C3.20804 6.65744 3.28867 6.85952 3.4344 7.0104L5.0344 8.6104C5.18442 8.76038 5.38787 8.84463 5.6 8.84463C5.81213 8.84463 6.01558 8.76038 6.1656 8.6104L9.3656 5.4104Z"
                fill="#10B981"
              />
            </svg>

            <span>Secure and encrypted platform</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SignupHallOwner;
