import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc, doc, updateDoc, getDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Authentication
const signupButton = document.getElementById("signup-button");
const signinButton = document.getElementById("signin-button");

signupButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    alert("Signed up successfully!");
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("lobby-container").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});

signinButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in successfully!");
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("lobby-container").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});

// Lobby Management
const createLobbyButton = document.getElementById("create-lobby-button");
const joinLobbyButton = document.getElementById("join-lobby-button");
const startLobbyButton = document.getElementById("start-lobby-button");

createLobbyButton.addEventListener("click", async () => {
  const lobbyName = document.getElementById("lobby-name").value;
  const lobbyPassword = document.getElementById("lobby-password").value;
  try {
    const lobbyRef = await addDoc(collection(db, "lobbies"), {
      name: lobbyName,
      ownerId: auth.currentUser.uid,
      slots: 10,
      players: [],
      password: lobbyPassword,
      status: "waiting"
    });
    alert(`Lobby created with ID: ${lobbyRef.id}`);
  } catch (error) {
    alert(error.message);
  }
});

joinLobbyButton.addEventListener("click", async () => {
  const lobbyId = document.getElementById("join-lobby-id").value;
  const lobbyPassword = document.getElementById("join-lobby-password").value;
  const team = document.getElementById("team-select").value;
  try {
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const lobbySnap = await getDoc(lobbyRef);
    if (lobbySnap.exists()) {
      const lobbyData = lobbySnap.data();
      if (lobbyData.password !== lobbyPassword) {
        throw new Error("Incorrect lobby password");
      }
      if (lobbyData.players.length < lobbyData.slots) {
        const teamCount = lobbyData.players.filter(player => player.team === team).length;
        if (teamCount < 5) {
          await updateDoc(lobbyRef, {
            players: arrayUnion({ userId: auth.currentUser.uid, team: team })
          });
          alert("Joined lobby successfully!");
        } else {
          throw new Error(`Team ${team} is full`);
        }
      } else {
       
