import useApi from 'customHooks/useApi';
import Cookies from 'js-cookie';

const { AuthContext } = require('contexts/AuthContext');
const { useState, useEffect } = require('react');

const withAuth = (WrappedComponent) => (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null); // need to take the initial value from localstorage/ cookie
    const [authError, setAuthError] = useState(''); // if some error returns from server - can be used to show messages on App
    const [role, setRole] = useState(null); // same here, best practise to take from localstorage/cookie
    const [api, apiLoading] = useApi();
    const [loading, setLoading] = useState(apiLoading);

    useEffect(
        () => {
            setLoading(true);
            const user = Cookies.get('jwt');
            if (user) {
                const email = localStorage.getItem('email');
                const role = localStorage.getItem('role');
                setLoggedInUser({ email, role });
                // Really need to find way to fetch role here
            }
            setLoading(false);
        },
        [
            /** will run only one time */
        ]
    );

    useEffect(() => {
        setLoading(apiLoading);
    }, [apiLoading]);

    const signIn = async ({ email, password }) => {
        console.log('signing in');
        const { data, errors } = await api.signIn({ email, password });
        if (errors) {
            setAuthError(errors);
        } else {
            Cookies.set('jwt', data.jwt);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            setLoggedInUser({ email: data.email, role: data.role });
        }
    };

    const signInWithGoogle = async () => {
        console.log('google signing in'); // won't need it
    };
    const signInWithLinkdin = async () => { // won't need it
        console.log('linkedin signing in');
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
        signInWithLinkdin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            <WrappedComponent {...props} />
        </AuthContext.Provider>
    );
};

export default withAuth;
