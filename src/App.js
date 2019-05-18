import React, { Component }  from 'react';

import Header from './Components/Header';
import Content from './Components/Content';

class App extends  Component {  
render(){
  return (
    <div className="bg-light pb-5">
        <Header/>
        <Content/>
    </div>

  )
}
}
export default App;