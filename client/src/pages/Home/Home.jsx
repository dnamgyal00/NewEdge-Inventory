import React from 'react';
import Button from '../../components/Button/Button';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h1>Welcome to My React App</h1>
            <Button label="Click me" onClick={() => alert('Button clicked!')} />
        </div>
    );
};

export default Home;