import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';



function Dropdown({ children }) {


    const [show_actions, setShowActions] = useState(false);
    const dropdownElement = useRef(null);

    function hideActions({ target }) {
        if (dropdownElement.current !== target) {
            setShowActions(false);
        }
    }

    useEffect(() => {
        if (show_actions) {
            document.addEventListener('click', hideActions);
            return () => document.removeEventListener('click', hideActions);
        }
    }, [show_actions])


    return (
        <div ref={dropdownElement} className={`actions${show_actions ? ' show' : ''}`}>
            <div onClick={() => setShowActions(!show_actions)} className="icon">
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
            <div className="actions-list">
                {children}
            </div>
        </div>
    )
}

export default Dropdown;