import React from "react";
import {
    List,
    ListItem,
    ListItemText, Button
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import Copyright from "../Copyright";

import TextField from "@material-ui/core/TextField";
import AssetsManager from "../Database/AssetsManager";

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

const classes = {
    root: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#d01a1a',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
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


export default class AdminSuggestionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'selection-suggestions': {}
        }

        this.onListSearchUpdate = this.onListSearchUpdate.bind(this)
        this.navigateToMenu = this.navigateToMenu.bind(this)
        this.navigateToSuggest = this.navigateToSuggest.bind(this)
        this.handleSuggestion = this.handleSuggestion.bind(this)
    }

    redirectToUrl(event, url) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) {
            newWindow.opener = null
        }
    }

    onListSearchUpdate(event, value) {
        const stateObject = function () {
            const returnObj = {};
            const key = event.target.id.split('-')[2]
            if (!key) {
                returnObj['selection-suggestions'] = {};
            } else {
                const associatedKey = `selection-${key}`.toLowerCase()
                returnObj[associatedKey] = value !== null ? value : {};
            }
            return returnObj;
        }.bind(event)();

        this.setState(stateObject)
    }

    renderAssetList(asset, name) {
        /*return <div>
            <FixedSizeList height={400} width={300} itemSize={46} itemCount={length}>
                {renderRow}
            </FixedSizeList>
        </div>*/
        const associatedKey = `selection-${name}`.toLowerCase()

        if (!this.state[associatedKey] || !this.state[associatedKey].url) {
            return <div/>
        }
        return <div style={classes.root}>
            <List style={{backgroundColor: '#ffffff', color: '#000000'}} subheader={<li />}>
                {this.state[associatedKey].url.map((element) => (
                    <li key={element.link} style={classes.listSection}>
                        <ul style={classes.ul}>
                            <ListItem button onClick={event => this.redirectToUrl(event, element.link)} key={`item-${element.link}`}>
                                <ListItemText primary={element.link} />
                                <ListItemText primary={element.start} />
                            </ListItem>
                        </ul>
                    </li>
                ))}
            </List>
        </div>
    }

    renderAssetSearch(asset, name) {
        const associatedValue = `selection-${name}`
        return <div style={{
            backgroundColor: '#ffffff',
            display: 'inline-block',
            'verticalAlign': 'middle'}}>
            <Autocomplete color='inherit'
                          onChange={this.onListSearchUpdate}
                          id={`combo-box-${name}`}
                          options={asset}
                          getOptionLabel={(option) => `${option.name} (${option.theme})`}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} value={this.state[associatedValue]} label={name} variant="outlined" />}
            />
            {this.renderAssetList(asset, name)}
        </div>
    }

    /** @param {boolean} validate */
    handleSuggestion(validate) {

        console.log("handle suggestion with validation: " + validate)
        //validate: true or false
        const suggestion = this.state['selection-suggestions']

        if (suggestion) {
            AssetsManager.HandleSuggestion(suggestion, validate)
        }
    }

    navigateToMenu() {
        this.props.history.push('/')
    }

    navigateToSuggest() {
        this.props.history.push('/assets/suggest')
    }

    render() {
        return <div>
            <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
            <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={this.navigateToMenu}>
                Menu
            </Button>
            <div style={{
                width: '50%',
                height: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                {this.renderAssetSearch(AssetsManager.getSuggestions(), 'Suggestions')}
            </div>
            <div  style={{
                position: 'fixed',
                bottom: '77px',
                right: '120px'
            }}>
                <Button
                    variant="contained"
                    style={{backgroundColor : '#f50404'}}
                    onClick={event => this.handleSuggestion(false)}
                >
                    Reject
                </Button>
            </div>
            <div  style={{
                position: 'fixed',
                bottom: '77px',
                right: '20px'
            }}>
                <Button
                    variant="contained"
                    style={{backgroundColor : '#0FDC06'}}
                    onClick={event => this.handleSuggestion(true)}
                >
                   Accept
                </Button>
            </div>
            <Copyright />
        </div>
    }
}