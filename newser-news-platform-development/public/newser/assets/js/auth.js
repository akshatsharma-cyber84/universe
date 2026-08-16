// auth.js — Authentication module for NEWSer
const Auth = (() => {
  const FORMSPREE_URL = 'https://formspree.io/f/xgobnrbj';

  async function submitToFormspree(data) {
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          mobile: data.phone,
          timestamp: new Date().toISOString(),
          interests: (data.interests || []).join(', ')
        })
      });
      if (res.ok) return { success: true };
      return { success: false, message: 'Could not save your information. Please try again.' };
    } catch {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async function sendOTP(phone) {
    return OTPProvider.sendOTP(phone);
  }

  async function verifyOTP(phone, otp) {
    return OTPProvider.verifyOTP(phone, otp);
  }

  async function resendOTP(phone) {
    return OTPProvider.resendOTP(phone);
  }

  function login(user) {
    Storage.setUser(user);
  }

  function logout() {
    Storage.clearAll();
    location.reload();
  }

  return { submitToFormspree, sendOTP, verifyOTP, resendOTP, login, logout };
})();
