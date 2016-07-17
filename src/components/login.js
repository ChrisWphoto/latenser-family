import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

//material ui componentDidUpdate(prevProps, prevState) {
import TextField from 'material-ui/TextField';
import {deepOrange500, teal500, lime500, blue500, green500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

//actions
import { attemptLogin } from '../actions/auth_actions';
import { attemptLoginFB } from '../actions/auth_actions';
import { logoutUser } from '../actions/auth_actions';

// material theme
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const muiTheme = getMuiTheme({});


class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      register: false,
      email:  '',
      password: '',
      fullName: ''  
    };
  }

  toggleRegister() {
    this.setState({register: !this.state.register});
  }

  callLogin() {
    this.props.attemptLogin(this.state.email, this.state.password);
    browserHistory.push('/calendar');
  }

  callLoginFB() {
    this.props.attemptLoginFB();
  }

  getEmail(e, txt){
    this.setState({email: txt});
  }

  getPassword(e, txt){
    this.setState({password: txt});
  }

  render() {
    let loginButtons = <div>
                        
                        <FlatButton
                          label="Need an Account?"
                          onTouchTap={this.toggleRegister.bind(this)}
                        />
                        <RaisedButton
                          onClick={this.callLogin.bind(this)}
                          style={{margin: '12px'}}
                          backgroundColor={green500}
                          label="Login"
                        />
                      </div> 
    let registerBtns = <div>
                          <TextField
                            hintText="Full Name"
                            hintStyle={{color:'rgb(0, 188, 212)'}}
                            style={style.textField}
                          />
                          <br/>
                          <FlatButton
                            label="Need to Login?"
                            onTouchTap={this.toggleRegister.bind(this)}
                          />
                          <RaisedButton
                            
                            style={{margin: '12px'}}
                            backgroundColor={teal500}
                            label="Register"
                          /> 
                          </div>
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="wrapper-login">
        <div className="login-box">
           <Paper style={style} zDepth={5} >
            <div className="login-paper">
              <h1> LatenserFamily.us </h1>
              <TextField
                hintText="Email"
                hintStyle={{color:'rgb(0, 188, 212)'}}
                style={style.textField}
                onChange={this.getEmail.bind(this)}    
              />   
              <TextField
                hintText="Password"
                hintStyle={{color:'rgb(0, 188, 212)'}}
                style={style.textField}
                onChange={this.getPassword.bind(this)}
              />
              {this.state.register ? registerBtns : loginButtons}
              <br/>
              <RaisedButton
                onClick={this.props.attemptLoginFB}
                style={{margin: '12px'}}
                backgroundColor={blue500}
                label="Facebook Login"
              />
             </div>
           </Paper>
        </div>
        <br/>
        
        <br/>
        <button onClick={this.props.attemptLoginFB} > FB LOGIN!</button>
        <br/>
        <button onClick={this.props.logoutUser} > Logout</button>
         <br/> <br/> <br/>
         <h3> {this.props.user.username } {this.props.user.currently}</h3>
      </div>
      </MuiThemeProvider>
    );
  }
}function mapStateToProps(state) {
  return { user: state.auth }
}

export default connect(mapStateToProps, { attemptLogin, attemptLoginFB, logoutUser } )(Login);

const style = {
  height: 350,
  width: 600,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  textAlign: 'center',
  button : {
    margin: 12,
  },
  textField: {
    margin: 10
  }
};