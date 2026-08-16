// auth-provider.js — OTP provider adapter for NEWSer
// This file provides the interface layer between NEWSer and the OTP backend.
// In production, replace DevelopmentProvider with a real provider.

// === DEVELOPMENT ADAPTER (demo only) ===
const DevelopmentProvider = {
  _otps: {},
  async sendOTP(phone) {
    // In development, simulate OTP send
    // DEVELOPMENT ONLY — the demo OTP is 9793 for phone 8601264402
    this._otps[phone] = { otp: '9793', expires: Date.now() + 300000 };
    return { success: true, message: 'OTP sent (development mode)' };
  },
  async verifyOTP(phone, otp) {
    const record = this._otps[phone];
    if (!record) return { success: false, message: 'No OTP requested for this number.' };
    if (Date.now() > record.expires) return { success: false, message: 'OTP has expired. Request a new one.' };
    // Development: accept 9793 for any phone, or specific phone/otp combo
    if (otp === '9793') return { success: true, message: 'Verified' };
    return { success: false, message: 'Incorrect OTP. Please try again.' };
  },
  async resendOTP(phone) {
    return this.sendOTP(phone);
  }
};

// === PRODUCTION ADAPTER (template) ===
// Replace the URL with your secure OTP endpoint
const ProductionProvider = {
  endpoint: '/api/otp', // Your secure serverless endpoint
  async sendOTP(phone) {
    try {
      const res = await fetch(this.endpoint + '/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      return await res.json();
    } catch {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  async verifyOTP(phone, otp) {
    try {
      const res = await fetch(this.endpoint + '/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      return await res.json();
    } catch {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  async resendOTP(phone) {
    return this.sendOTP(phone);
  }
};

// === ACTIVE PROVIDER ===
// Switch to ProductionProvider when deploying with a real OTP backend
const OTPProvider = DevelopmentProvider;
