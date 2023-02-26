import useApi from 'customHooks/useApi';
import Cookies from 'js-cookie';
import queryString from 'query-string';

const { AuthContext } = require('contexts/AuthContext');
const { useState, useEffect } = require('react');

const withAuth = (WrappedComponent) => (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null); // takes the initial value from localstorage
    const [authError, setAuthError] = useState(''); // if some error returns from server - can be used to show messages on App
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const [api, apiLoading] = useApi();
    const [loading, setLoading] = useState(apiLoading);
    const search = window.location.search
    const queryParams = queryString.parse(search);

    useEffect(
        () => {
            setLoading(true);
            const user = Cookies.get('jwt');
            if (user) {
                const email = localStorage.getItem('email');
                const role = localStorage.getItem('role');
                const name = localStorage.getItem('name');
                const accountId = localStorage.getItem('accountId');
                setLoggedInUser({ email, role, name, accountId });
                // Really need to find way to fetch role here
            }else if(queryParams.jwt){
                Cookies.set('jwt', queryParams.jwt);
                localStorage.setItem('email', queryParams.email);
                localStorage.setItem('role', queryParams.role);
                localStorage.setItem('name', queryParams.name);
                localStorage.setItem('accountId', queryParams.accountId);
                setLoggedInUser({ email: queryParams.email, name: queryParams.name ,role: queryParams.role, accountId: queryParams.accountId });

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
            localStorage.setItem('name', data.name);
            localStorage.setItem('accountId', data.accountId);
            setLoggedInUser({ email: data.email, role: data.role, name: data.name,accountId: data.accountId });
        }
    };


    const signInWithGoogle = async (response) => {
        console.log("AuthHOC signInWithGoogle")
        const data = api.GoogleApi(response);
        Cookies.set('jwt', data.jwt);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        setLoggedInUser({ email: data.email, role: data.role });
    }

    const signInWithLinkdin = async () => { // won't need it
        console.log('linkedin signing in');
    };
    const signOut = async (email) => {
        console.log('signing out');
        const { data, errors } = await api.signOut(email);
        if (errors) {
            setAuthError(errors);
        } else {
            Cookies.set('jwt', "");
            localStorage.setItem('email', "");
            localStorage.setItem('role', "");
            localStorage.setItem('name', "");
            localStorage.setItem('accountId', "");
            setLoggedInUser({ email: "", name:"",role: "", accountId:"" });
        }
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
        setName,
        accountId,
        setAccountId,
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
