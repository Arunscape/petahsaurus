import React, { useState , useRef} from 'react'
import * as Api from '../api';


function TagEditor(props) {
    return <div>
        <p>Tag #1</p>
        <input type="text" onChange={(e) => props.keySetter(e.target.value)}/>
        <input type="text" onChange={(e) => props.valSetter(e.target.value)}/>
    </div>
}

const NewFindings = () => {
    const [descr, setDescr] = useState("");
    const [tagKey, setTagKey] = useState("");
    const [tagVal, setTagVal] = useState("");
    const [picture, setPicture] = useState(null);
    const inputRef = useRef();


    const submitFunction = () => {
        //console.log("Submit got clicked");
        //console.log(inputRef)
        //console.log(picture)
        //console.log(descr);
        console.log(tagKey + " " + tagVal);

        Api.createFinding({content: "eat shit", coords: {lat: 5.5, long: 5.5}})
            //.then((resp) => Api.getFinding(resp.data.id))
            .then((data) => console.log(data.data));

        //Api.setTag(id, tagKey, tagVal);
    }

    return <div>
        MAKE A DINOSAUR PAGE 
        <p>picture</p>
        <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" onChange={(e) => setPicture(e.target.files.item(0)) }/>
        <p>description</p>
        <input type="text" onChange={(e) => setDescr(e.target.value)}/>
        <TagEditor keySetter={setTagKey} valSetter={setTagVal}></TagEditor>
        <br></br><button onClick={ submitFunction } > Submit </button>
    </div>
}

export default NewFindings;