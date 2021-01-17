import React, { useState , useRef} from 'react'

const NewFindings = () => {
    const [descr, setDescr] = useState("");
    const [picture, setPicture] = useState(null);
    const inputRef = useRef();


    const submitFunction = () => {
        //console.log("Submit got clicked");
        //console.log(inputRef)
        //console.log(picture)
        //console.log(descr);
    }

    return <div>
        MAKE A DINOSAUR PAGE 
        <br></br>
        <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" onChange={(e) => setPicture(e.target.files.item(0)) }/>
        <input type="text" onChange={(e) => setDescr(e.target.value)}/>
        <button onClick={ submitFunction } > Submit </button> <br></br>
        <br></br>
    </div>
}

export default NewFindings;