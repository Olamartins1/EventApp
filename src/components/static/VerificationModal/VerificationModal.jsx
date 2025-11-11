


// import { useState, useRef, useEffect } from "react";
// import { X } from "lucide-react";
// import "./VerificationModal.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Loading from "../../../components/static/Loading/Loading";

// const VerificationModal = ({ email, onClose }) => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(59);
//   const [isResending, setIsResending] = useState(false);
//   const inputRefs = useRef([]);
// const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Use email safely
//   const userEmail = email || localStorage.getItem("signupEmail");
//     const savedPassword = localStorage.getItem("signupPassword");
//   const userRole = localStorage.getItem("userRole");
//   if (!userEmail) {
//     console.warn("⚠️ No email found for verification.");
//   }

//   // Countdown timer
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // Handle input change
//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newCode = [...code];
//     newCode[index] = value.slice(-1);
//     setCode(newCode);
//     if (value && index < 5) inputRefs.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !code[index] && index > 0)
//       inputRefs.current[index - 1]?.focus();
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").slice(0, 6);
//     if (/^\d+$/.test(pasted)) {
//       const newCode = pasted.split("");
//       setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   // ✅ Verify OTP
//   const handleVerify = async () => {
//     const verificationCode = code.join("");

//     if (verificationCode.length < 6) {
//       toast.error("Please enter the 6-digit code");
//       return;
//     }

//     if (!userEmail) {
//       toast.error("Email not found — please sign up again");
//       return;
//     }
//       setIsLoading(true);

//     try {
//       const res = await axios.post(
//         "https://eventiq-final-project.onrender.com/api/v1/verify",
//         {
//           email: userEmail,
//           otp: verificationCode,
//         }
//       );

//       toast.success(res.data.message || "Account verified successfully!");
//       localStorage.removeItem("signupEmail");

//       // ✅ Close modal and navigate after short delay
//       setTimeout(() => {
//         onClose?.();
//         // navigate("/dashboardHome");


//   if (userRole === "venue-owner") {
//     navigate("/dashboardHome");
//   } else {
//     navigate("/individual-dashboard");
//   }

//       }, 1500);
//     } catch (error) {
//       const errMsg = error.response?.data?.message || "Verification failed";
//       toast.error(errMsg);
//       console.error("Verification error:", error);
//     }finally{
//       setIsLoading(false)
//     }
//   };

//   // ✅ Resend OTP
//   const handleResend = async () => {
//     if (!email) {
//       toast.error("Email not found — please sign up again");
//       return;
//     }

//     setIsResending(true);
//     try {
//       const res = await axios.post(
//         "https://eventiq-final-project.onrender.com/api/v1/resendOtp",
//         { email }
//       );
//       toast.success(res.data.message || "New code sent to your email!");
//       setTimer(59);
//       setCode(["", "", "", "", "", ""]);
//     } catch (error) {
//       const errMsg = error.response?.data?.message || "Failed to resend code";
//       toast.error(errMsg);
//       console.error("Resend error:", error);
//     } finally {
//       setIsResending(false);
//     }
//   };

//     if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <button className="close-button" onClick={onClose}>
//           <X size={24} />
//         </button>

//         <h2 className="modal-title">Verification</h2>
//         <p className="modal-description">
//           A verification code has been sent to <b>{email}</b>. Please enter it below.
//         </p>

//         <div className="code-inputs">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={handlePaste}
//               className="code-input"
//             />
//           ))}
//         </div>

//         <button className="verify-btn" onClick={handleVerify}>
//           Verify
//         </button>

//         <div className="resend-section">
//           {timer > 0 ? (
//             <p className="resend-text">
//               Resend code in <span className="timer">{formatTime(timer)}</span>
//             </p>
//           ) : (
//             <button
//               className="resend-btn"
//               onClick={handleResend}
//               disabled={isResending}
//             >
//               {isResending ? "Resending..." : "Resend Code"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerificationModal;

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import "./VerificationModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/static/Loading/Loading";

const VerificationModal = ({ email, onClose }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Use saved email + password for auto-login
  const userEmail = email || localStorage.getItem("signupEmail");
  const savedPassword = localStorage.getItem("signupPassword"); // must be saved during signup
  // const userRole = localStorage.getItem("userRole");

  if (!userEmail) {
    console.warn("No email found for verification.");
  }

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newCode = pasted.split("");
      setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Verify OTP and then Auto-login
  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length < 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    if (!userEmail) {
      toast.error("Email not found — please sign up again");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Verify the user
      const verifyRes = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/verify",
        {
          email: userEmail,
          otp: verificationCode,
        }
      );

      toast.success(verifyRes.data.message || "Account verified successfully!");
      localStorage.removeItem("signupEmail");

      // Step 2: Automatically log in the user
      // Ensure you have the saved password from signup
      if (!savedPassword) {
        toast.info("Please log in manually — password not saved.");
        onClose?.();
        navigate("/login");
        return;
      }

      const loginRes = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/login",
        {
          email: userEmail,
          password: savedPassword,
        }
      );

      if (loginRes.data && loginRes.data.token && loginRes.data.data) {
        const user = loginRes.data.data;
        const role = user.role;

        localStorage.setItem("authToken", loginRes.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userRole", role);

        toast.success("Verification complete! Logging you in...");

          onClose?.();
          if (role === "venue-owner") {
            navigate("/dashboardHome");
          } else {
            navigate("/individual-dashboard");
          }
      } else {
        toast.error("Login failed after verification. Please try again.");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Verification failed";
      toast.error(errMsg);
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userEmail) {
      toast.error("Email not found — please sign up again");
      return;
    }

    setIsResending(true);
    try {
      const res = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/resendOtp",
        { email: userEmail }
      );
      toast.success(res.data.message || "New code sent to your email!");
      setTimer(59);
      setCode(["", "", "", "", "", ""]);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to resend code";
      toast.error(errMsg);
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Verification</h2>
        <p className="modal-description">
          A verification code has been sent to <b>{userEmail}</b>. Please enter it below.
        </p>

        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="code-input"
            />
          ))}
        </div>

        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>

        <div className="resend-section">
          {timer > 0 ? (
            <p className="resend-text">
              Resend code in <span className="timer">{formatTime(timer)}</span>
            </p>
          ) : (
            <button
              className="resend-btn"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
