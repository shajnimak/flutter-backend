const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvwtJoCvEOjCE_NenPmZajWxUbttxvc_E",
  authDomain: "auth-movie-app-f319b.firebaseapp.com",
  projectId: "auth-movie-app-f319b",
  storageBucket: "auth-movie-app-f319b.appspot.com",
  messagingSenderId: "976047410800",
  appId: "1:976047410800:web:b327a84ff930e036346eb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Получаем объект аутентификации Firebase
const auth = getAuth();

// Контроллер для регистрации нового пользователя
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: 'User registered successfully', user: userCredential.user });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Контроллер для входа пользователя
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: 'User logged in successfully', user: userCredential.user });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
