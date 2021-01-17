import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Header from '../components/Header';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import submit from '../assets/submiticon.svg'
import loctag from '../assets/location.svg'
import addimg from '../assets/addimg.svg'
import addtag from '../assets/addtag.svg'
import removetag from '../assets/removetag.svg'

import * as Api from '../api';

const StyledImage = styled.img`
  width: 50%;
  border: 1px solid red;
`;

const Addimg = styled.input`
display: none;
`;

const ImgUpload = styled.div`
/* display: none; */
`
const Addimgicon = styled.img`
width: 30vw;
max-width: 5rem;
padding: 0.5rem;
`;

const KVPair = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledBackground = styled.div`
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

const Locbutton = styled.button`
background: transparent;
border: none;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const Loctag = styled.img`
width: 10vw;
max-width: 2rem;
padding: 0.5rem;
`;

const Loctext = styled.div`
font-size: 5vw;
font-size: max(1.5rem);
`;

const Idinput = styled.input`
border-style: solid;
border-top: none;
border-right: none;
border-left: none;
border-color: #ABA59B;
font-size: 2vw;
box-sizing: border-box;
width: 50vw;
max-width: 40rem;
text-align: center;
`;

const Spacer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const Addandremovetag = styled.button`
background: none;
border: none;
width: 15vw;
max-width: 3rem;
padding: 0.5rem;
`;

const Submitbox = styled.div`
`

const SubmitButton = styled.button`
width: 10vw;
max-width: 4rem;
background: transparent;
border: none;
`;

const NewFindings = () => {
  const [new_key, setNewKey] = useState('');
  const [new_value, setNewValue] = useState('');
  const [id, setId] = useState<string>();

  const inputRef = useRef();
  const history = useHistory();
  const location = useLocation();

  const [finding, setFinding] = useState<Api.Finding>({
    content: '',
    image: '',
    date: -1,
    coords: {
      lat: -1,
      long: -1,
    },
    tags: {},
    id: undefined
  });

  useEffect(() => {
    if (location.pathname.startsWith('/add')) {
      return;
    }
    const getid = location.pathname.replace('/edit/', '');
    setId(getid);
    Api.getFinding(id).then((res) => {
      let f = res.data;
      if (!f.tags) {
        f.tags = {}; // PETER THIS IS YOUR FAULT AND YOU KNOW IT I HAD TO DO THIS BECAUSE OF YOU
      }
      setFinding(f);
    });
    console.log(finding);
  }, [id]);

  console.log('UPDATE FINDING', finding);

  const SET_THE_FUCKING_TAGS_SEPARATELY_BECAUSE_PETER_SUCKS = async (
    the_fucking_id: string,
  ) => {
    if (!finding || !finding.tags) {
      return;
    }
    await Promise.all(
      Object.entries(finding.tags).map(
        async ([key, value]: [string, string]) => {
          await Api.setTag(the_fucking_id, key, value);
        },
      ),
    );
    history.push('/home');
  };

  return (
    <StyledBackground>
      <Header />
      {finding && finding.image && (
        <StyledImage
          src={finding ? finding.image : 'https://via.placeholder.com/150'}
        />
      )}
      <ImgUpload>
{/* REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
      <Addimg
        ref={inputRef}
        id="file-input"
        type="file"
        accept="image/x-png,image/jpeg"
        onChange={(e) => {
            let reader = new FileReader();
            let image = e.target.files[0];

            // ok so basically, reader.readAsDataURL happens first
            // this event listener waits for it to finish converting to base64
            // then it  does stuff inside here
            reader.addEventListener(
                'load',
                () => {
                    console.log('BASE64 image:');
                    console.log(reader.result.toString());
                    const new_finding = {
                        ...finding,
                        image: reader.result.toString(),
                    };
                    setFinding(new_finding);
                },
                false,
                );

                reader.readAsDataURL(image);
            }}
            />
      <label htmlFor="file-input">
    <Addimgicon src={addimg}/>
    </label>
    </ImgUpload>
      <Locbutton
        onClick={() => {
            if (!('geolocation' in navigator)) {
            alert('geolocation not available');
            return;
          }
          navigator.geolocation.getCurrentPosition((pos) => {
            setFinding({
              ...finding,
              coords: {
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
              },
            });
          });
        }}
      >
        <Loctag src={loctag}/>
        <Loctext>
        Get location
        </Loctext>
      </Locbutton>
      <Idinput
        type="text"
        placeholder="identification (what organism is it?)"
        // @ALEX OR PETER WHAT THE FUCK IS THE TAG NAME CALLED FOR IDENTIFICATION??? E.G. DINOSAURIA
        // IF IT'S NOT 'identification' YOU GOTTA CHANGE IT
        value={
          finding.tags && finding.tags.identification
            ? finding.tags.identification
            : ''
        }
        onChange={(e) =>
          setFinding({
            ...finding,
            tags: {
              ...finding.tags,
              identification: e.target.value,
            },
          })
        }
      />
      {finding &&
        finding.tags &&
        Object.entries(finding.tags)
          .filter(([key, _]: [string, string]) => key != 'identification') // ALED OR PETER IF THE DEFAULT IDENTIFICATION E.G. DINOSAURIA TAG IS NOT 'identification' YOU NEED TO CHANGE IT
          .map(([key, value]: [string, string]) => {
            return (
              <KVPair key={key}>
                <div>{key}</div>
                <Spacer />
                <div>{value}</div>
                <Spacer />
                <Addandremovetag
                  onClick={() => {
                    let copy = { ...finding };
                    delete copy.tags[key];
                    setFinding(copy);
                  }}
                >
                  <img src={removetag}/>
                </Addandremovetag>
              </KVPair>
            );
          })}

      <KVPair>
        <input
          type="text"
          placeholder="key: example mass"
          value={new_key}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <Spacer />
        <input
          type="text"
          placeholder="value example 69kg"
          value={new_value}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Spacer />
        <Addandremovetag
          onClick={() => {
            let copy = { ...finding };
            copy.tags[new_key] = new_value;
            setFinding(copy);
            setNewKey('');
            setNewValue('');
          }}
        >
          <img src={addtag}/>
        </Addandremovetag>
      </KVPair>
      <Submitbox>
      <SubmitButton
        onClick={() => {
          const date = Math.floor(Date.now() / 1000);
          const usr = Api.getUserIdInfo();
          const user = usr.sub; // Arun, this is how you get user id
          const verified = false; // HOW THE FUCK DO WE KNOW IF A USER IS VERIFIED THIS IS ON YOU BACKEND FOLKS!!!
          const needs_id = !!finding.tags.identification
            const new_finding: Api.Finding = { ...finding, date, tags:{
            ...finding.tags,
            user,
            verified: verified.toString(),
                needs_id: needs_id.toString(),
          } };
          setFinding(new_finding);

          console.log('submitting this');
          console.log(finding);
          if (location.pathname.startsWith('/add')) {
            Api.createFinding(new_finding).then((data) => {
              // @arostron or PETER IS THIS NEEDED IDK
              //   for (let [key, value] of tagList) {
              //       console.log("posting for tags: " + key + value);
              //       Api.setTag(data.data.id, key, value);
              //   }
              setId(data.data.id);
              SET_THE_FUCKING_TAGS_SEPARATELY_BECAUSE_PETER_SUCKS(data.data.id);
            });
          } else if (location.pathname.startsWith('/edit')) {
            Api.editFinding(new_finding).then((data) => {
              // todo something else?
              // THIS IS WHY Y'ALL SHOULD NOT FUCKING GO TO BED SMH IT'S ONLY MIDNIGHT
              SET_THE_FUCKING_TAGS_SEPARATELY_BECAUSE_PETER_SUCKS(id);
            });
          }
        }}
      >
        <img src={submit}/>
      </SubmitButton>
      </Submitbox>
    </StyledBackground>
  );
};

export default NewFindings;
