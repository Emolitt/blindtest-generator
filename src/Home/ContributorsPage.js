import React from "react";
import {
    Button,
    Typography,
} from "@material-ui/core";
import {Helmet} from "react-helmet";
import Copyright from "../Copyright";

const containerController = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white'
}

const buttonStyle = (customColor) => {
    return {
        backgroundColor : customColor,
        marginTop: '1%',
        marginLeft: '1%',
        width: '10%',
        height: '40px'
    }
}

export default class ContributorsPage extends React.Component {
    constructor(props) {
        super(props);

        this.navigateToMenu = this.navigateToMenu.bind(this)
    }

    navigateToMenu() {
        this.props.history.push('/')
    }

    render() {
        return <div style={{ overflow: 'hidden' }}>
            <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
            <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={this.navigateToMenu}>
                Menu
            </Button>
            <div style={containerController}>
                <Typography color='inherit'>Work In Progress..</Typography>
            </div>
            <Copyright />
        </div>
    }
}