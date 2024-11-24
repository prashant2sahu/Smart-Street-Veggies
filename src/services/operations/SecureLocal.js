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


/**
 * Updates specific fields in encrypted user data stored in localStorage.
 * @param {String} key - The localStorage key for the encrypted data.
 * @param {Object} updatedFields - The fields to update (e.g., { firstName, lastName }).
 */
export function updateLocalStorageData(key, updatedFields) {
    try {
        // Retrieve existing data
        const existingData = getFromLocalStorage(key);
        if (!existingData) {
            console.error("No existing data found for update.");
            return false;
        }
        if (updatedFields.BookId) {
            if (existingData.BookId) {
                // If BookId exists, check if it's not an array, convert it to an array
                if (!Array.isArray(existingData.BookId)) {
                    existingData.BookId = [existingData.BookId];
                }
                // Push the new BookId if it's not already in the array
                if (!existingData.BookId.includes(updatedFields.BookId)) {
                    existingData.BookId.push(updatedFields.BookId);
                }
            } else {
                // If no BookId exists, create it as an array
                existingData.BookId = [updatedFields.BookId];
            }
        }
        // Merge the updated fields into the existing data
        const updatedData = {
            ...existingData, // Retain all existing fields
            ...updatedFields, // Overwrite with updated fields
        };

        // Save the updated data back to localStorage
        saveToLocalStorage(key, updatedData);
        console.log("Data updated successfully:", updatedData);
        return true;
    } catch (error) {
        console.error("Error updating localStorage data:", error.message);
        return false;
    }
}
