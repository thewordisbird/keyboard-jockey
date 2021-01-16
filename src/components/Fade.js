import React, { useEffect, useState } from "react";

const Fade = ({ display, children }) => {
    const [show, setShow] = useState(display);

    useEffect(() => {
        if (display) setShow(true);
    }, [display])

    const onAnimationEnd = () => {
        if(!display) setShow(false)
    }

    return (
        show && 
                <div 
                    style={{animation: `${display ? 'fadeIn' : 'fadeOut'} 1s`}}
                    onAnimationEnd={onAnimationEnd}
                >
                    { children }
                </div>
           
        
    )
}

export default Fade;