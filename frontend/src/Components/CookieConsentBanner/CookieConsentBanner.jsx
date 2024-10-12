// CookieConsentBanner.jsx
import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom" // Banner position (bottom, top)
      buttonText="I Understand" // Button text
      cookieName="userConsentCookie" // Name for the cookie stored
      style={{ background: "#2B373B", color: "#fff", fontSize: "14px", zIndex:9999 }} // Banner style
      buttonStyle={{ color: "#fff", background: "#15803d", fontSize: "13px" }} // Button style
      expires={365} // Cookie expiration in days
      onAccept={() => {
        console.log("User accepted cookies."); // Optional callback for acceptance
      }}
      enableDeclineButton // Optional: Shows decline button
      declineButtonText="Decline"
      declineButtonStyle={{ color: "#fff", background: "#f44336", fontSize: "13px" }} // Decline button style
      onDecline={() => {
        console.log("User declined cookies."); // Optional callback for decline
      }}
    >
      This website uses cookies to enhance user experience, store user preferences, and for analytics purposes. By continuing, you agree to our use of cookies. Learn more in our <a href="/privacy_policy.html" style={{ color: "#f1d600" }}>Privacy Policy</a>.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
