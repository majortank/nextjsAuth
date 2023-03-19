// Create auth context
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Firebase auth state change listener
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        const roleRef = firebase.firestore().collection('roles').doc(uid);

        roleRef.get().then((doc) => {
          const data = doc.data();
          setCurrentUser({ email, uid, role: data?.role });
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Firebase sign up function
  const signUp = async (email, password, role) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const roleRef = firebase.firestore().collection('roles').doc(user.uid);
      await roleRef.set({ role });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase login function
  const login = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in with Email');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase login with Google function
  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const { user } = userCredential;
      const roleRef = firebase.firestore().collection('roles').doc(user.uid);
      const doc = await roleRef.get();
      if (!doc.exists) {
        await roleRef.set({ role: 'patient' });
      }
      console.log('Logged in with Google');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase logout function
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook for child components to get the auth object and re-render when it changes.
export function useAuth() {
  return useContext(AuthContext);
}
