import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
//import TextField from 'material-ui/TextField';
import * as API from '../api/API';
import FileList from "./FileList";
import DropboxLogo from '../images/DropboxLogo.png'

class Welcome extends Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
        //images: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            username: this.props.currentUser,
            images: [],
            filename: '',
            newfolder: false,
            newSharedfolder: false
        };
    }

    componentWillMount() {
        console.log('inside compnt will mount1', this.state.username);
        document.title = `Welcome, ${this.state.username} !!`;


        API.getFiles()
            .then((data) => {
                this.setState({
                    images: data.resArray,
                    username: data.objectSession
                });
            });
        console.log('inside compnt will mount2', this.state.username);
    }

    componentDidMount() {


        console.log('inside compnt Did mount', this.state.username);


    }

    render() {
        return (

            <div className="row">
                <div className="col-md-2 panelSty">
                    <div><a href='/welcome'><img src={DropboxLogo} className="panelstyImg" /></a><br/></div>
                    <div><a href='/welcome'><h4 className="textStyle">Home</h4></a></div>
                   <div> <a href={Welcome} ><h4 className="textStyle2">Files</h4></a></div>
                    <div><a href={Welcome}><h4 className="textStyle3">Profile</h4></a></div>
                    <div><a href={Welcome}><h4 className="textStyle4">Activities <input type='Button' value='New'
                                                                                        className="btn panelButton"/>
                    </h4></a></div>
                </div>

                <div className="col-md-10 mainpart ">

                    <FileList handleLogout={this.props.handleLogout}/>
                </div>
            </div>


        )
    }
}

export default withRouter(Welcome);
