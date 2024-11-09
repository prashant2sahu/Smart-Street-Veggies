// Importing required modules
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
const User = require("../Models/User");
// Configuring dotenv to load environment variables from .env file
// dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
    try {
		console.log("Cookies:", req.cookies);
        // Extracting JWT from request cookies, body, or header
        const token =
            req.cookies.token ||
            req.body.token ||
            (req.headers.Authorization && req.headers.Authorization.split(" ")[1]);

        console.log("Mauth token",token);

        // If JWT is missing, return 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: "Token Missing" });
        }

        try {
            // Verifying the JWT using the secret key stored in environment variables
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        console.error("Error during authentication:", error);
        return res.status(401).json({
            success: false,
            message:" Something went wrong while validating the token",
        });
    }
};
exports.isCartMan = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "CartMan") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for CartMan",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "User Role Can't be Verified" });
	}
};
exports.isCustomer = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Customer") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Customer",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "User Role Can't be Verified" });
	}
};