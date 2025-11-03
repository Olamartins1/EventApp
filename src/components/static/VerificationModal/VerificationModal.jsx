



// import { useState, useRef, useEffect } from "react";
// import { X } from "lucide-react";
// import "./VerificationModal.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const VerificationModal = ({ email, onClose }) => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//    const [timeLeft, setTimeLeft] = useState(600);
//   const [isResending, setIsResending] = useState(false);
//   const inputRefs = useRef([]);
//    const email = user?.email || (localStorage.getItem("signupEmail") ?? "");
//   const nav = useNavigate();


//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);


//   const handleChange = (index, value) => {
//     if (value.length > 1) value = value.slice(-1);
//     if (/^\d*$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);
//       if (value && index < 5) inputRefs.current[index + 1]?.focus();
//     }
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
//       inputRefs.current[Math.min(pasted.length, 5)]?.focus();
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleVerify = async () => {
//     const verificationCode = code.join("");
//     if (verificationCode.length < 6) {
//       toast.error("Please enter the 6-digit code");
//       return;
//     }

//     try {
  
//     await axios.post("https://eventiq-final-project.onrender.com/api/v1/verify", {
//   otp: verificationCode,
//   email: userEmail,
// });

// toast.success("Account created and verified successfully! 🎉");
// setTimeout(() => {
//   navigate("/dashboardHome");
//   onClose();
// }, 1500);
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Invalid or expired code");
//   }
// };
//   const handleResend = async () => {
//     if (!userEmail) {
//       toast.error("Email not found — please sign up again");
//       return;
//     }

//     setIsResending(true);
//     try {
//       await axios.post("https://eventiq-final-project.onrender.com/api/v1/resendOtp", {
//         email: userEmail,
//       });
//       toast.success("A new verification code has been sent!");
//       setTimer(59);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to resend code");
//     } finally {
//       setIsResending(false);
//     }
//   };

//   useEffect(() => {
//     if (timeLeft <= 0) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}: ${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const handleChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;

//     const newCode = [...code];
//     newCode[index] = value.slice(-1);
//     setCode(newCode);

//     if (value && index < code.length - 1) {
//       const nextInput = document.getElementById(`code-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const verifyCode = async () => {
//     const enteredCode = code.join("");
//     console.log("Verifying:", { email, otp: enteredCode });
//     setLoading(true);
//     setMessage("");
//     console.log("Code entered:", enteredCode);
//     console.log("Verifying for email:", email, "and OTP:", enteredCode);
//       if (!email) {
//     toast.error("❌ No email found. Please sign up again.");
//     return;
//   }

//     try {
//       const res = await axios.post("https://eventiq-final-project.onrender.com/api/v1/verify", {
//         email,
//         otp: enteredCode,
//       });

//       if (res.data) {
//         setMessage(res.data);
//         toast.success("✅ Response:" + res.data.message);
//         localStorage.removeItem("pendingEmail");
//          nav("/");
//         openLoginModal();
//       }
//     } catch (error) {
//       const errMsg = error.response?.data?.message || "Verification failed";
//       setMessage(errMsg);
//       toast.error("❌ Verification failed:" + errMsg);
//     } finally {
//       setIsResending(false);
//     }

//     console.log("Verifying for email:", email);
//   };

//   const resendCode = async () => {
//     setCode(["", "", "", "", "", ""]);
//     setTimeLeft(100);
//     console.log("Resend code triggered");
//     console.log("Resending to email:", email);
//       if (!email) {
//     toast.error("❌ No email found. Please sign up again.");
//     return;
//   }

//     try {
//       const res = await axios.post("https://eventiq-final-project.onrender.com/api/v1/resendOtp", {
//         email,
//       });
//       toast.success("📩 A new verification code has been sent to your email.");
//       console.log("Resend response:", res.data);
//     } catch (error) {
//       const errMsg = error.response?.data?.message || "Failed to resend code";
//       toast.error("❌ " + errMsg);
//     }
//   };

//   const isCodeComplete = code.every((digit) => digit !== "");

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <button className="close-button" onClick={onClose}>
//           <X size={24} />
//         </button>

//         <h2 className="modal-title">Verification</h2>
//         <p className="modal-description">
//           A verification code has been sent to your email address.
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

const VerificationModal = ({ email, onClose }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Use email safely
  const userEmail = email || localStorage.getItem("signupEmail");
  const userRole = localStorage.getItem("userRole");
  if (!userEmail) {
    console.warn("⚠️ No email found for verification.");
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

  // ✅ Verify OTP
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

    try {
      const res = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/verify",
        {
          email: userEmail,
          otp: verificationCode,
        }
      );

      toast.success(res.data.message || "Account verified successfully!");
      localStorage.removeItem("signupEmail");

      // ✅ Close modal and navigate after short delay
      setTimeout(() => {
        onClose?.();
        // navigate("/dashboardHome");


  if (userRole === "venue-owner") {
    navigate("/dashboardHome");
  } else {
    navigate("/individual-dashboard");
  }

      }, 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Verification failed";
      toast.error(errMsg);
      console.error("Verification error:", error);
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found — please sign up again");
      return;
    }

    setIsResending(true);
    try {
      const res = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/resendOtp",
        { email }
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

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Verification</h2>
        <p className="modal-description">
          A verification code has been sent to <b>{email}</b>. Please enter it below.
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
