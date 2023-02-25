const { AuthContext } = require('contexts/AuthContext');
const { useState } = require('react');

const withAuth = (WrappedComponent) => (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null); // need to take the initial value from localstorage/ cookie
  const [authError, setAuthError] = useState(''); // if some error returns from server - can be used to show messages on App
  const [role, setRole] = useState(null); // same here, best practise to take from localstorage/cookie

  const signIn = async ({ email, password }) => {
    console.log('signing in');
    setLoggedInUser('email@email');
    // TODO: Call sign in with params
    // if status code 200:
    // setLoggedInUser: put email or something
    // role: Fetch rule from /users/:email
    // setRole: the role
  };

  const signInWithGoogle = async () => {
    console.log('signing in');
  };
  const signInWithLinkdin = async () => {
    console.log('signing in');
  };
  const signOut = async () => {
    // TODO: Call sign our with params
    // if status code 200:
    // setLoggedInUser: null
    // setRole: null
    console.log('signing out');
  };

  const signUp = async () => {
    console.log('signing up');
  };

  const value = {
    loggedInUser,
    setLoggedInUser,
    role,
    setRole,
    signIn,
    signOut,
    signUp,
    authError,
    signInWithGoogle,
    signInWithLinkdin
  };

  return (
    <AuthContext.Provider value={value}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
};

export default withAuth;
