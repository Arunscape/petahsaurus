import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Header from '../components/Header';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import * as Api from '../api';

const StyledImage = styled.img`
  width: 50%;
  border: 1px solid red;
`;

const KVPair = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spacer = styled.div`
padding-left: 1em;
padding-right: 1em;
`

const SubmitButton = styled.button``;

const NewFindings = () => {
  const [new_key, setNewKey] = useState('');
  const [new_value, setNewValue] = useState('');

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
    id: undefined,
  });

  useEffect(() => {
    if (location.pathname.startsWith('/add')) {
      return;
    }
    const id = location.pathname.replace('/edit/', '');
    Api.getFinding(id).then((res) => {
      let f = res.data;
      if (!f.tags) {
        f.tags = {}; // PETER THIS IS YOUR FAULT AND YOU KNOW IT I HAD TO DO THIS BECAUSE OF YOU
      }
      setFinding(f);
    });
    console.log(finding);
  }, []);

  const submitFunction = async () => {};

  return (
    <StyledBackground>
      <Header />
      {finding && finding.image && (
        <StyledImage
          src={finding ? finding.image : 'https://via.placeholder.com/150'}
        />
      )}
      <input
        ref={inputRef}
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
      <button onClick={() => alert('TODO')}>Get location</button>
      <input
        type="text"
        placeholder="identification (what do you think the fossil is?"
      />
      {finding &&
        finding.tags &&
        Object.entries(finding.tags).map(([key, value]: [string, string]) => {
          return (
            <KVPair key={key}>
              <div>{key}</div>
              <Spacer/>
              <div>{value}</div>
              <Spacer/>
              <button
                onClick={() => {
                  let copy = { ...finding };
                  delete copy.tags[key];
                  setFinding(copy);
                }}
              >
                ❌
              </button>
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
        <Spacer/>
        <input
          type="text"
          placeholder="value example 69kg"
          value={new_value}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Spacer/>
        <button
          onClick={() => {
            let copy = { ...finding };
            copy.tags[new_key] = new_value;
            setFinding(copy);
            setNewKey('');
            setNewValue('');
          }}
        >
          ✅
        </button>
      </KVPair>

      <SubmitButton
        onClick={() => {
          if (location.pathname.startsWith('/add')) {
            Api.createFinding(finding).then((data) => {
              // @arostron or PETER IS THIS NEEDED IDK
              //   for (let [key, value] of tagList) {
              //       console.log("posting for tags: " + key + value);
              //       Api.setTag(data.data.id, key, value);
              //   }
            });
            history.push('/home');
          } else if (location.pathname.startsWith('/edit')) {
            Api.editFinding(finding).then((data) => {
              // todo something else?
              // THIS IS WHY Y'ALL SHOULD NOT FUCKING GO TO BED SMH IT'S ONLY MIDNIGHT
              history.push('/home');
            });
          }
        }}
      >
        Submit
      </SubmitButton>
    </StyledBackground>
  );
};

export default NewFindings;
