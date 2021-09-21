import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { incrementCountAction } from './actions'

function App({ increment, count }) {
  console.log(count)
  return (
    <div className="App">
      <button onClick={increment}>{count}</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}

const mapDispatchToProps = {
  increment: incrementCountAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
