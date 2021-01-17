import React, { useState , useRef} from 'react'
import Header from '../components/Header'
import {useHistory} from 'react-router-dom'

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
    const history = useHistory();
    
    const submitFunction = async () => {
        //console.log("Submit got clicked");
        //console.log(inputRef)
        //console.log(picture)
        //console.log(descr);
        console.log(tagKey + " " + tagVal);

        const reader = new FileReader();

        reader.addEventListener("load", function () {
          // convert image file to base64 string
          console.log(reader.result.toString());
          setPicture(reader.result.toString())

          Api.createFinding({content: "eat shit", coords: {lat: 5.5, long: 5.5}, image: reader.result.toString(), date: 69})
              //.then((resp) => Api.getFinding(resp.data.id))
              .then((data) => console.log(data.data));

              history.push("/home");
        }, false);
      
        if (picture) {
          reader.readAsDataURL(picture);
          setPicture(reader.result.toString())
        }


        //Api.setTag(id, tagKey, tagVal);
    }

    return <div>
        <Header/>
        MAKE A DINOSAUR PAGE 
        <p>picture</p>
        <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" onChange={(e) => {
            setPicture(e.target.files.item(0)) 
        // make backend call to upload picture
        }}/>
        <p>description</p>
        <input type="text" onChange={(e) => setDescr(e.target.value)}/>
        <TagEditor keySetter={setTagKey} valSetter={setTagVal}></TagEditor>
        <br></br><button onClick={ submitFunction } > Submit </button>
        <img src={picture}/>
    </div>
}

export default NewFindings;