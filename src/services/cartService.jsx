import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get bucket of user from firestore
 * @param {string} userId -  UID of user
 * @returns {Array} - user bucket (array)
 */

export async function getUserCart(userId) {
  try {
    // "users" collection from firestore
    const userDocRef = doc(db, "users", userId); 
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Sepet verilerini döndür
      return userDoc.data().cart || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw new Error("Failed to fetch user cart.");
  }
}