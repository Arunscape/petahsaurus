import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Header from '../components/HomeHeader';
import FindingCard from '../components/FindingCard';
import * as Api from '../api';

const Home = () => {
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    Api.getAllFindings()
      .then((res) => setFindings(res.data))
  }, []);

  return (
    <div>
      <Header />
      {findings.map((finding: Api.Finding) => (
        <FindingCard finding={finding}/>
      ))}
    </div>
  );
};

export default Home;
