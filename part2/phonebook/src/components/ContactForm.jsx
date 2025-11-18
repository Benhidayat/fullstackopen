import React from 'react'

const ContactForm = ({
    onSubmit,
    name,
    number,
    handleName,
    handleNumber
}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    Name: <input type="text" value={name} onChange={handleName} />
                </div>
                <div>
                    Number: <input type="text" value={number} onChange={handleNumber} />
                </div>
                <div>
                    <button type='submit' disabled={!number || !name}>add</button>
                </div>
            </form>
        </div>
    )
};

export default ContactForm;
