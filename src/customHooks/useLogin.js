import { useState } from 'react';

const useSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return { email, setEmail, password, setPassword };
};

export default useSignIn;
