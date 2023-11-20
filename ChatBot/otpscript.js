function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);

  window.generatedOTP = otp;

  alert(`Your OTP is: ${otp}  Note it down.`);
}

function verifyOTP() {
  const email = document.getElementById("email").value;
  const otpInput = document.getElementById("otp").value;

  if (otpInput === window.generatedOTP.toString()) {
    document.getElementById("message").innerText =
      "OTP Verified successfully! Redirecting...";

    setTimeout(function () {
      window.location.href = "bot/index.html";
    }, 2000);
  } else {
    document.getElementById("message").innerText =
      "Incorrect OTP. Please try again.";
  }
}
