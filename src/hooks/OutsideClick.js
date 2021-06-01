import React, { useRef, useState, useEffect } from 'react';

const OutsideClick = () => {
    const ref = useRef(null);
    const [isActive, setActive] = useState();

    const handleClickOutside = (event) => {
        console.log(ref);
        if (ref.current && !ref.current.contains(event.target)) setActive(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [ref]);

    return { isActive, setActive, ref }
}

export default OutsideClick;