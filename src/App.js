import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Background from './Background';
import Nav from './Nav';
import Gallery from './Gallery';
import Music from './Music';
import Home from './Home';
import Museum from './Museum';
import NotFound from './NotFound';

class App extends Component {
  state = {
    backgroundStyle: {
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bilbao_-_Guggenheim_aurore.jpg/1200px-Bilbao_-_Guggenheim_aurore.jpg)'
    }
  }

  updateBackground = url => {
    url = `url(${url})`;
    console.log(url);
    this.setState(prevState => ({
      backgroundStyle: {
        backgroundImage: url
      }
    }));
  }

  /*****
  App is set to render Background at all times to maintain changes after Museum dismounts
  Gallery and Music are always rendered to persist the music and current gallery contents when
  navigating elsewhere. They remain hidden unless the appropriate path is accessed.
  This always necessitates dummy values in the Switch component so that the NotFound
  component isn't rendered inappropriately.
  *****/
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <div className="Page">
            <Background backgroundStyle={this.state.backgroundStyle} />
            <div className="Content">
              <Route
                path="/"
                render={({ location }) => {
                  let hiddenGallery = true;
                  let hiddenMusic = true;
                  if (location.pathname === '/Gallery') {
                    hiddenGallery = false;
                  } else if (location.pathname === '/Music') {
                    hiddenMusic = false;
                  }
                  return (
                    <div>
                      <Gallery hidden={hiddenGallery}/>
                      <Music hidden={hiddenMusic} />
                    </div>
                  );
                }} />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/Gallery" />
                <Route exact path="/Music" />
                <Route
                  exact path='/Museum'
                  render={() =>
                    <Museum handleBackgroundUpdate={this.updateBackground} />
                  } />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
