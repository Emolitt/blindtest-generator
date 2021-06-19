import React from "react";
import {
    ListItem,
    ListItemText, Button
} from "@material-ui/core";
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import Copyright from "../Copyright";
import AssetsManager from "../Database/AssetsManager";
import {FlatMapAssets} from "../Generator/SelectionGenerator";
import KeyboardEventHandler from "react-keyboard-event-handler";
import KeyboardEvents from "./KeyboardEvent";

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

const buttonStyle = (customColor) => {
    return {
        backgroundColor : customColor,
        marginTop: '1%',
        marginLeft: '1%',
        width: '10%',
        height: '40px'
    }
}


export default class DifficultyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'assets': FlatMapAssets(AssetsManager.ThemeList.games),
            'asset': {}
        }

        this.easy = []
        this.normal = []
        this.hard = []

        this.navigateToMenu = this.navigateToMenu.bind(this)
        this.navigateToSuggest = this.navigateToSuggest.bind(this)
        this.addToEasy = this.addToEasy.bind(this);
        this.addToNormal = this.addToNormal.bind(this);
        this.addToHard = this.addToHard.bind(this);

    }

    navigateToMenu() {
        this.props.history.push('/')
    }

    navigateToSuggest() {
        //AssetsManager.setAssetsOfCollection(require('../Assets/musiques.json'), 'musics')
        //AssetsManager.setAssetsOfCollection(require('../Assets/game.json'), 'games')
        //AssetsManager.setAssetsOfCollection(require('../Assets/anime.json'), 'animes')
        this.props.history.push('/assets/suggest')
    }

    downloadTxtFile = (name, asset) => {
        const element = document.createElement("a");
        const file = new Blob([asset], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${name}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    nextAsset = () => {
        if (this.state.assets.length === 0) {
            this.downloadTxtFile('easy', JSON.stringify(this.easy))
            this.downloadTxtFile('normal', JSON.stringify(this.normal))
            this.downloadTxtFile('hard', JSON.stringify(this.hard))
            //writeJsonFile('easy.json', this.easy);
            //writeJsonFile('normal.json', this.normal);
            //writeJsonFile('hard.json', this.hard);
            //this.navigateToMenu();
        } else {
            const asset = this.state.assets.pop()
            this.setState({
                'asset': asset
            })
        }

    }

    addToEasy() {
        this.easy.push(this.state.assets[0])
        this.nextAsset()
    }

    addToNormal() {
        this.normal.push(this.state.assets[0])
        this.nextAsset()
    }

    addToHard() {
        this.hard.push(this.state.assets[0])
        this.nextAsset()
    }

    //---------------------------------------------------------User Inputs
    handleKeyDown = (key, event) => {
        switch (key) {
            case 'up':
                this.addToNormal()
                break
            case 'left':
                this.addToEasy()
                break
            case 'right':
                this.addToHard()
                break
            default:
                break
        }
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
                color: 'white',
                transform: 'translate(-50%, -50%)'
            }}>
                {this.state.asset.name}
            </div>
            <span style={{ color: 'white' }}>{this.state.assets.length} remaning</span>
            <div  style={{
                position: 'fixed',
                bottom: '77px',
                right: '20px'
            }}>
                <Button variant="contained" style={{backgroundColor : '#0FDC06'}} onClick={this.addToEasy}>
                    Easy
                </Button>
                <Button variant="contained" style={{backgroundColor : '#062adc'}} onClick={this.addToEasy}>
                    Normal
                </Button>
                <Button variant="contained" style={{backgroundColor : '#a80101'}} onClick={this.addToEasy}>
                    Hard
                </Button>
            </div>
            <div style={{ display: 'none' }}>
                <KeyboardEventHandler
                    handleKeys={['up','left', 'right']}
                    onKeyEvent={this.handleKeyDown} />
            </div>
            <Copyright />
        </div>
    }
}