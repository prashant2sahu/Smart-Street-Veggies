import CryptoJS from "crypto-js";

// Use a secure, unique encryption key
const encryptionKey = "utgwqnrjsfasbklfhsflkah"; 

// Encrypt function
function encryptData(data) {
    try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
        return encrypted;
    } catch (error) {
        console.error("Encryption error:", error.message);
        return null; // Return null if encryption fails
    }
}

// Decrypt function
function decryptData(cipherText) {
    try {
        // Decrypt the cipher text
        const bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
        
        // Convert bytes to a UTF-8 string
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        
        // Check if decryption output is empty
        if (!decryptedText) {
            throw new Error("Decryption failed: Empty or invalid decrypted text.");
        }
        
        // Parse decrypted text as JSON
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption or parsing error:", error.message);
        return null; // Return null or handle the error as needed
    }
}

// Save data to LocalStorage (Encrypted)
export function saveToLocalStorage(key, data) {
    const encryptedData = encryptData(data);
    if (encryptedData) {
        localStorage.setItem(key, encryptedData);
    } else {
        console.error("Failed to save data: Encryption failed.");
    }
}

// Retrieve data from LocalStorage (Decrypted)
export function getFromLocalStorage(key) {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
        console.warn("No data found for key:", key);
        return null;
    }
    return decryptData(encryptedData);
}
