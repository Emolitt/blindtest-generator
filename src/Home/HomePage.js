import React from "react";
import {
    Button
} from "@material-ui/core";
import {Helmet} from "react-helmet";
import Copyright from "../Copyright";

const containerController = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const buttonStyle = (customColor) => {
    return {backgroundColor : customColor,
        marginTop: '8%',
        width: '40%',
        height: '50px'
    }
}

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.navigateToCheckout = this.navigateToCheckout.bind(this)
        this.navigateToAssets = this.navigateToAssets.bind(this)
        this.navigateToContributors = this.navigateToContributors.bind(this)
    }

    navigateToCheckout() {
        this.props.history.push('/checkout');
    }

    navigateToAssets() {
        this.props.history.push('/assets');
    }

    navigateToContributors() {
        this.props.history.push('/contributors');
    }

    render() {
        return <div style={{ overflow: 'hidden' }}>
            <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
            <div style={containerController}>
                <p style={{color: 'white'}}>Update: A big thanks to Dorian You for providing new Musics in playlist !</p>
                <Button variant="contained" style={buttonStyle('#0FDC06')} onClick={this.navigateToCheckout}>
                    Generate Blindtest
                </Button>
                <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={this.navigateToAssets}>
                    See Assets Library
                </Button>
                <Button variant="contained" style={buttonStyle('#b53ad6')} onClick={this.navigateToContributors}>
                    See contributors
                </Button>
            </div>
            <Copyright />
        </div>
    }
}