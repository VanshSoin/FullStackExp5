import React from 'react';

const Contact = () => {
    return (
        <div className="page contact">
            <h1>Contact Page</h1>
            <p>Get in touch with us.</p>
            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <button type="button">Send</button>
            </form>
        </div>
    );
};

export default Contact;
