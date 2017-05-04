import React, { Component } from 'react';
var { HashRouter, Route, Switch, Link } = require('react-router-dom');
import { Timeline } from 'react-twitter-widgets'; 

import nextArrow from './img/move-forward.png';
import nextArrowReg from './img/move-forward-reg.png'
import backArrow from './img/go-back.png'; 
import spendArrow from './img/spend-arrow.png'; 
import receiveArrow from './img/receive-arrow.png'; 

// sentimentArrows
import angryArrow from './img/angry_arrow.png'; 
import happyArrow from './img/happy_arrow.png'; 
import sadArrow from './img/sad_arrow.png'; 
import neutralArrow from './img/neutral_arrow.png'; 

// placeholder twitter feed
// import twitterFeed from './img/twitter-feed-display.png'

// confirmation icon
import confirmation from './img/confirmation.png'

import './App.css';


//create the Home Screen 
var HomeScreen = React.createClass ({
  render: function() {
    return (
      <div className="App">
        <div className="App-title">
          <p className="hows">How's</p>
          <p className="nan">Nan</p>
        </div>
        <Link to="/JourneySplit">
          <Next />
        </Link>
      </div>
    )
  }
})

// create the JourneySplit
var JourneySplit = React.createClass ({
  render: function() {
    return (
      <div className="App-page">
        <div className="JourneySplit-wrapper">
          <p className="journey-intro"> So you have the new Scottish fiver eh? </p>
          <p className="journey-text"> Yes and I’m about to spend it. </p>
          <Link to="RecordId"> 
            <img className="Arrow"src={spendArrow} alt="spend-arrow" />
          </Link> 
          <p className="journey-text"> Yes! I just received it. </p>
          <Link to="AnalyzeSentiment">
            <img className="Arrow"src={receiveArrow} alt="receive-arrow" />
          </Link>
        </div> 
        <Link to="/HomeScreen">
          <Back />
        </Link>
      </div>
    )
  }
})

// create the RecordId for recording sentiment
var RecordId = React.createClass ({
  render: function() {
    return (
      <div className="App-page">
        <div className="RecordId-wrapper">
          <p className="enter-id"> Enter the ID that appears on the bottom right of the note </p>
          <input type="number" name="noteID">
          </input> 
        </div> 
        <div className="navigation">
          <Link to="/JourneySplit">
            <Back className="nav nav-back"/>
          </Link>
          <Link to="/RecordSentiment">
            <NextReg/>
          </Link>
        </div>
      </div>
    )
  }
})

// create the AnalyzeSentiment
var RecordSentiment = React.createClass ({
  getInitialState: function() {
    return {
      condition: false
    }
  },
  addAngry: function(){
    this.setState({
      angry: !this.state.angry
    });  
  },
  addHappy: function(){
    this.setState({
      happy: !this.state.happy
    });  
  }, 
  addSad: function(){
    this.setState({
      sad: !this.state.sad
    });  
  }, 
  addNeutral: function(){
    this.setState({
      neutral: !this.state.neutral
    });  
  }, 
  render: function() {
    return (
      <div className="App-page">
        <p className="feelings"> How do you feel about this transaction? </p>
        <div className="sentiment-wrapper">
          <div className="sentimentArrow"> 
            <img onClick={this.addAngry} className="" src={angryArrow} alt="angry-arrow" />  
            <span className= {this.state.angry ? "senti-text senti-selected angry" : "senti-text angry" } > ANGRY </span> 
          </div>
          <div className="sentimentArrow"> 
            <img onClick={this.addHappy} className="" src={happyArrow} alt="happy-arrow" />  
            <span className= {this.state.happy ? "senti-text senti-selected happy" : "senti-text happy" } > HAPPY </span> 
          </div>       
          <div className="sentimentArrow"> 
            <img onClick={this.addSad} className="" src={sadArrow} alt="sad-arrow" />  
            <span className= {this.state.sad ? "senti-text senti-selected sad" : "senti-text sad" } > SAD </span> 
          </div> 
          <div className="sentimentArrow"> 
            <img onClick={this.addNeutral} className="" src={neutralArrow} alt="angry-arrow" />  
            <span className= {this.state.neutral ? "senti-text senti-selected neutral" : "senti-text neutral" } > NEUTRAL </span> 
          </div>
        </div> 
        <div className="navigation">
          <Link to="/RecordId">
            <Back className="nav nav-back"/>
          </Link>
          <Link to="/Confirmation">
            <NextReg/>
          </Link>
        </div>
      </div>
    )
  }
})

// create the AnalyzeSentiment
var AnalyzeSentiment = React.createClass ({
  render: function() {
    return (
      <div className="App-page">
        <div className="RecordId-wrapper">
          <p className="enter-id"> Enter the ID that appears on the bottom right of the note. Click the green arrow to analyze the sentiment. </p>
          <input type="number" name="noteID">
          </input> 
        </div> 
        <div className="navigation">
          <Link to="JourneySplit">
            <Back className="nav nav-back"/>
          </Link>
          <Link to="SentimentResult">
            <NextReg/>
          </Link>
        </div>
      </div>
    )
  }
})



// create the SentimentResult
var SentimentResult = React.createClass ({
  render: function() {
    return (
        <div className="sentiment-Result">
          <p className="result-text"> Nan is <span className="angry"> angry </span> </p>
          <img className="" src={angryArrow} alt="angry-arrow" />
          <p className="result-text tweets"> Latest Tweets </p> 
          <div className="twitter">
              <Timeline
                dataSource={{
                  sourceType: 'widget',
                  widgetId: '859484948281032705'
                }}
                options={{
                  height: '300'
                }}
                onLoad={() => console.log('Timeline is loaded!')}
              />
          </div> 
          <Link to="HomeScreen">
            <Back />
          </Link>
        </div> 
    )
  }
})


// create the Confirmation
var Confirmation = React.createClass ({
  render: function() {
    return (
      <div className="App-page">
        <div className="confirmation-wrapper">
          <img className="" src={confirmation} alt="confirmation" />
          <p className="enter-id thanks"> Thank you! As always, we won’t share this with Nan’s new owner, don't worry!  </p>
        </div> 
        <Link to="/HomeScreen">
          <Back/>
        </Link>
      </div>
    )
  }
})


// create the main javascript class APP
class App extends Component {
  render() {
    return (
     <HashRouter>
        <Switch>
           <Route path='/HomeScreen' component={HomeScreen}/>
           <Route path='/JourneySplit' component={JourneySplit}/>
           <Route path='/RecordId' component={RecordId}/>
           <Route path='/AnalyzeSentiment' component={AnalyzeSentiment}/>
           <Route path='/RecordSentiment' component={RecordSentiment}/>
           <Route path='/SentimentResult' component={SentimentResult}/>
           <Route path='/Confirmation' component={Confirmation}/>
           <Route component={HomeScreen}/>
        </Switch>
     </HashRouter>
   );
  }
}


class Back extends Component {
  render () {
    return (
      <img className="backArrow"src={backArrow} alt="back-arrow" />
    )
  }
}

class Next extends Component {
  render () {
    return (
      <img className="nextArrow"src={nextArrow} alt="next-arrow" />
    )
  }
}

class NextReg extends Component {
  render () {
    return (
      <img className="nextArrowReg"src={nextArrowReg} alt="next-arrow" />
    )
  }
}




export default App;
