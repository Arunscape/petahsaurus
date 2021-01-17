import React, { useState , useRef} from 'react'
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
        console.log(props.original);
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


    const submitFunction = () => {
        //console.log("Submit got clicked");
        //console.log(inputRef)
        //console.log(picture)
        //console.log(descr);
        //console.log(tagKey + " " + tagVal);

        //Api.createFinding({content: "eat shit", coords: {lat: 5.5, long: 5.5}})
            //.then((resp) => Api.getFinding(resp.data.id))
            //.then((data) => console.log(data.data));

        //Api.setTag(id, tagKey, tagVal);
        
        // itterate over all the tag values 
        for (let t of tagList) {
            console.log(t);
        }
    }

    return <div>
        MAKE A DINOSAUR PAGE 
        <p>picture</p>
        <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" onChange={(e) => setPicture(e.target.files.item(0)) }/>
        <p>description</p>
        <input type="text" onChange={(e) => setDescr(e.target.value)}/>
        {tagList.map((t, i) => <TagEditor index={i} setter={setTagList} original={tagList}></TagEditor>)}
        <br></br><button onClick={ () => setTagList([...tagList, ["", ""]]) } > more tags </button>
        <br></br><button onClick={ submitFunction } > Submit </button>
    </div>
}

export default NewFindings;