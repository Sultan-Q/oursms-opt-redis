# oursms-otp-redis

A Node.js module for OTP (One-Time Password) generation and verification using Redis for storage and OurSMS API for sending SMS messages.

## Features

- Generate and send OTP to phone numbers
- Verify OTP
- Customizable OTP length and message template
- Uses Redis for OTP storage with expiration
- Integrates with OurSMS API for sending SMS

## Installation

```bash
npm install oursms-otp-redis
```

## Usage

### Initialize the Service

```javascript
const OTPService = require("oursms-otp-redis");
// or
import OTPService from "oursms-otp-redis";

const otpService = new OTPService("redis://localhost:6379", "your-sms-api-key");
```

### Send OTP

```javascript
try {
  const response = await otpService.sendOTP(
    "96654XXXXXX",
    6,
    "Your OTP is: {otp}"
  );
  console.log(response);
} catch (error) {
  console.error(error);
}
```

### Verify OTP

```javascript
try {
  const isValid = await otpService.verifyOTP("96654XXXXXX", "123456");
  console.log(isValid);
} catch (error) {
  console.error(error);
}
```

## API Reference

### `new OTPService(redisUrl, smsApiKey)`

Creates a new instance of the OTP service.

- `redisUrl`: URL of the Redis server
- `smsApiKey`: API key for OurSMS service

### `sendOTP(phoneNumber, otpLength, messageTemplate)`

Generates and sends an OTP to the specified phone number.

- `phoneNumber`: The recipient's phone number
- `otpLength`: Length of the OTP to generate
- `messageTemplate`: SMS message template. Use `{otp}` as a placeholder for the OTP.

Returns a promise that resolves with the API response.

### `verifyOTP(phoneNumber, otp)`

Verifies the OTP for the given phone number.

- `phoneNumber`: The phone number to verify the OTP for
- `otp`: The OTP to verify

Returns a promise that resolves to `true` if the OTP is valid, `false` otherwise.

## License

ISC

---

# حزمة oursms-otp-redis

حزمة Node.js لتوليد والتحقق من كلمة المرور لمرة واحدة (OTP) باستخدام Redis للتخزين و OurSMS API لإرسال الرسائل القصيرة.

## الميزات

- توليد وإرسال OTP إلى أرقام الهواتف
- التحقق من صحة OTP
- طول OTP وقالب الرسالة قابل للتخصيص
- يستخدم Redis لتخزين OTP مع وقت انتهاء الصلاحية
- يتكامل مع OurSMS API لإرسال الرسائل القصيرة

## التثبيت

```bash
npm install oursms-otp-redis
```

## الاستخدام

### تهيئة الخدمة

```javascript
const OTPService = require("oursms-otp-redis");
// أو
import OTPService from "oursms-otp-redis";

const otpService = new OTPService(
  "redis://localhost:6379",
  "مفتاح-api-الخاص-بك"
);
```

### إرسال OTP

```javascript
try {
  const response = await otpService.sendOTP(
    "96654XXXXXX",
    6,
    "رمز التحقق الخاص بك هو: {otp}"
  );
  console.log(response);
} catch (error) {
  console.error(error);
}
```

### التحقق من OTP

```javascript
try {
  const isValid = await otpService.verifyOTP("96654XXXXXX", "123456");
  console.log(isValid);
} catch (error) {
  console.error(error);
}
```

## مرجع API

### `new OTPService(redisUrl, smsApiKey)`

ينشئ نسخة جديدة من خدمة OTP.

- `redisUrl`: عنوان URL لخادم Redis
- `smsApiKey`: مفتاح API لخدمة OurSMS

### `sendOTP(phoneNumber, otpLength, messageTemplate)`

يولد ويرسل OTP إلى رقم الهاتف المحدد.

- `phoneNumber`: رقم هاتف المستلم
- `otpLength`: طول OTP المراد توليده
- `messageTemplate`: قالب رسالة SMS. استخدم `{otp}` كعنصر متغير لـ OTP.

يعيد وعدًا يتم حله مع استجابة API.

### `verifyOTP(phoneNumber, otp)`

يتحقق من صحة OTP لرقم الهاتف المعطى.

- `phoneNumber`: رقم الهاتف للتحقق من OTP الخاص به
- `otp`: OTP المراد التحقق منه

يعيد وعدًا يتم حله إلى `true` إذا كان OTP صالحًا، و`false` خلاف ذلك.

## الترخيص

ISC

```

```
