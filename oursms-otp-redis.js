// otp-service.js

const Redis = require("ioredis");
const axios = require("axios");

class OTPService {
  constructor(redisUrl, smsApiKey) {
    this.redis = new Redis(redisUrl);
    this.smsApiKey = smsApiKey;
  }

  async generateOTP(length) {
    const digits = "123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async sendOTP(phoneNumber, otpLength, messageTemplate) {
    const otp = await this.generateOTP(otpLength);

    // Store OTP in Redis with 5 minutes expiration
    await this.redis.set(`otp:${phoneNumber}`, otp, "EX", 300);

    // Replace {otp} in the template with the actual OTP
    const message = messageTemplate.replace("{otp}", otp);

    // Send SMS using OurSMS API
    try {
      const response = await axios.post(
        "https://api.oursms.com/msgs/sms",
        {
          src: "oursms",
          body: message,
          dests: [phoneNumber],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.smsApiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw new Error("Failed to send OTP");
    }
  }

  async verifyOTP(phoneNumber, otp) {
    const storedOTP = await this.redis.get(`otp:${phoneNumber}`);
    if (storedOTP === otp) {
      await this.redis.del(`otp:${phoneNumber}`);
      return true;
    }
    return false;
  }
}

module.exports = OTPService;
