const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 20px auto;
				padding: 20px;
				border: 1px solid #dddddd;
				border-radius: 8px;
				text-align: center;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			}
	
			.logo {
				font-size: 2rem;
				color: #FFD60A;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 24px;
				font-weight: bold;
				color: #333333;
				margin-bottom: 15px;
			}
	
			.body {
				font-size: 16px;
				color: #555555;
				margin-bottom: 20px;
				text-align: left;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 25px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 18px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #777777;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
				color: #333333;
				font-size: 28px;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="logo">Smart Street Veggies</div>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with Smart Street Veggies. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<p class="highlight">${otp}</p>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
	
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:modelprashantsahu2004@gmail.com" style="color: #333333; text-decoration: underline;">abc@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = otpTemplate;
