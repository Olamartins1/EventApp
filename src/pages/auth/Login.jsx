import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LuUser } from "react-icons/lu";
import SignupModal from "../../components/static/signupModal/signupModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationModal from "../../components/static/VerificationModal/VerificationModal";
import Loading from "../../components/static/Loading/Loading";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
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
        "https://eventiq-final-project.onrender.com/api/v1/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

 login(response.data)
  localStorage.setItem("userRole", response.data.data.role);
toast.success(response?.data?.message)
       const userRole = response.data.data.role
        // setTimeout(() => navigate("/dashboardHome"), 2000);
         setTimeout(() => {
    if (userRole === "venue-owner") {
      navigate("/dashboardHome");
    } else if (userRole === "client") {
      navigate("/individual-dashboard");
    } else {
      // fallback (if role missing or new role added)
      navigate("/individual-dashboard");
    }
    setLoading(false);

  }, 2000);
    
    } catch (error) {
      console.error("Login error:", error);

      const message = error.response?.data?.message;

      //       toast.error(error.response?.data?.message  || "Something Went Wrong");

      //   } finally {
      //     setLoading(false);
      //   }
      // };
      if (message?.toLowerCase().includes("verify")) {
        toast.warn("Please verify your account before logging in.");
        openVerificationModal();
      } else {
        toast.error(message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async (email) => {
    try {
      await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/resendOtp",
        { email }
      );
      toast.info("A new verification code has been sent to your email.");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend verification code. Please try again.");
    }
  };

  // Modal controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const openVerificationModal = () => setShowVerificationModal(true);

  const openVerificationModal = async () => {
    setShowVerificationModal(true);
    await resendVerificationCode(formData.email);
  };
  const closeVerificationModal = () => setShowVerificationModal(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
  }, [isModalOpen]);

  return (
    <>
      {loading && <Loading />}
      <section className="signup-container-Login">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* LEFT SECTION */}
        <div className="left-section3">
          <div
            className="bg-image3"
            style={{ backgroundImage: "url('https://res.cloudinary.com/depuy7bkr/image/upload/v1761918729/left_side_log_in_evenitq1_rpxkvp.png')" }}
          ></div>

          <button
            className="back-btn3"
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

          <div className="left-content3">
            <h1>
              Log In to <br /> Continue.
            </h1>
            <p>
              Manage your event halls with ease and get more bookings, all on
              Eventiq.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <section className="right-section3">
          <div className="form-wrapper3">
            <div className="form-header3">
              <LuUser className="user-icon3" size={30} />
              <div className="form-header-text3">
                <h2>Welcome</h2>
                <p className="form-subtitle3">Log In to continue</p>
              </div>
            </div>

            <form className="form-content" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="input-group-email-Login">
                <label className="label-login">
                  <Mail size={14} className="label-icon" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="input-group-Login_password password-field-Login">
                <label>
                  <Lock size={14} className="label-icon-Login_password" />{" "}
                  Password
                </label>
                <div className="password-box-Login">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="checkbox-group-Login1">
                <Link to="/ForgotPassword" style={{ color: "#603379" }}>
                <strong>Forgot Password?</strong>
              </Link>
              </div>

              {/* Submit */}
              <button
                className="submit-btn-Login"
                style={{ background: "#603379" }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>

              {/* Signup Link */}
              <p className="login-text-Login">
                Don't have an account? <a onClick={openModal}>Sign Up</a>
              </p>
            </form>
            {isModalOpen && <SignupModal onClose={closeModal} />}
            {showVerificationModal && (
              <VerificationModal
                email={formData.email}
                onClose={closeVerificationModal}
              />
            )}

            <div className="security-note-Login">
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.1328 2.444C2.44891 2.4152 4.67585 1.54677 6.4 0C8.12403 1.54706 10.351 2.41578 12.6672 2.4448C12.7552 2.9648 12.8 3.5008 12.8 4.0456C12.8 8.2256 10.128 11.7816 6.4 13.0992C2.672 11.7808 0 8.2248 0 4.0448C0 3.4992 0.0455999 2.9648 0.1328 2.444ZM9.3656 5.4104C9.51133 5.25952 9.59196 5.05744 9.59014 4.84768C9.58832 4.63792 9.50418 4.43727 9.35585 4.28895C9.20753 4.14062 9.00688 4.05648 8.79712 4.05466C8.58736 4.05284 8.38528 4.13347 8.2344 4.2792L5.6 6.9136L4.5656 5.8792C4.41472 5.73347 4.21264 5.65284 4.00288 5.65466C3.79312 5.65648 3.59247 5.74062 3.44415 5.88895C3.29582 6.03727 3.21168 6.23792 3.20986 6.44768C3.20804 6.65744 3.28867 6.85952 3.4344 7.0104L5.0344 8.6104C5.18442 8.76038 5.38787 8.84463 5.6 8.84463C5.81213 8.84463 6.01558 8.76038 6.1656 8.6104L9.3656 5.4104Z"
                  fill="#10B981"
                />
              </svg>
              <span>Secure and encrypted platform</span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Login;
