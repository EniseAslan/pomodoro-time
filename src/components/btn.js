import React from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const btn = ({id, className,onClick,title}) => {

    return( 
<button onClick={onClick} className={className} id={id} title={title}/>


    )
}
export default btn;
