import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class Login extends Component{
    state = {
        open: true,
    };
    render(){
    return (
      <Dialog open={!this.props.loggedIn} fullScreen={this.props.fullScreen}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hiermit werden Ihre gebuchten Kurse abgerufen,zu denen Sie öffentliche Notizen erstellen und abrufen können.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="HFU Username"
            type="text"
            fullWidth
            onChange={this.props.handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Passwort"
            type="password"
            fullWidth
            onChange={this.props.handleInput}
          />
          {this.props.loading && <p>Versuche User einzuloggen</p>}
          {this.props.error && <p>Login Fehlgeschlagen</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleLogin} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    );
}
}

export default withMobileDialog()(Login);
