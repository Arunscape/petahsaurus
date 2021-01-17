import React, { useState , useRef} from 'react'
import Header from '../components/Header'
import {useHistory} from 'react-router-dom'

import * as Api from '../api';


// I hate this Im sorry
function TagEditor(props) {
    const index: number = props.index;
    const setter = props.setter;
    return <div>
        <span>Tag </span> <span>{index}</span>
        <input type="text" onChange={(e) => setter(props.original.map((element: [string, string], i:number) => {
        if (i === index) {
            return [e.target.value, element[1]]
        } else {
            return element;
        }
    }))}/>
        <input type="text" onChange={(e) => setter(props.original.map((element: [string, string], i:number) => {
        if (i === index) {
            return [element[0], e.target.value]
        } else {
            return element;
        }
    }))}/>
    </div>
}

const NewFindings = () => {


    const [tagList, setTagList] = useState([]);
    const [descr, setDescr] = useState("");
    const [picture, setPicture] = useState(null);
    const inputRef = useRef();
    const history = useHistory();

    const submitFunction = async () => {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
          setPicture(reader.result.toString())

          Api.createFinding({content: descr, coords: {lat: 5.5, long: 5.5}, image: reader.result.toString(), date: 69})
              .then((data) => {
                for (let [key, value] of tagList) {
                    console.log("posting for tags: " + key + value);
                    Api.setTag(data.data.id, key, value);
                }
                });
              history.push("/home");
        }, false);

        if (picture) {
          reader.readAsDataURL(picture);
          setPicture(reader.result.toString())
        }
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
        {tagList.map((t, i) => <TagEditor index={i} setter={setTagList} original={tagList}></TagEditor>)}
        <br></br><button onClick={ () => setTagList([...tagList, ["", ""]]) } > more tags </button>
        <br></br><button onClick={ submitFunction } > Submit </button>
        <img src={picture}/>
    </div>
}

export default NewFindings;
