import React, {useState} from "react";
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Autocomplete,
    TextField
} from "@mui/material";
import {Helmet} from "react-helmet";
import {Copyright} from "../../components";
import {useNavigate} from "react-router-dom";
import {StoreConsumerHook} from "../../store/store";
import type {JsonMusicUrl} from "../../models/DtoAsset";

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


export default function AssetsPage(props) {
    const navigate = useNavigate();
    const {assetManager} = StoreConsumerHook();
    const [state, setState] = useState({
        'selection-games': {},
        'selection-animes': {},
        'selection-films': {}
    });

    const redirectToUrl = (event, url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) {
            newWindow.opener = null
        }
    }

    const onListSearchUpdate = (event, value) => {
        const stateObject = function () {
            const returnObj = {};
            const key = event.target.id.split('-')[2]
            if (!key) {
                returnObj['selection-games'] = {};
                returnObj['selection-animes'] = {};
                returnObj['selection-films'] = {};
            } else {
                const associatedKey = `selection-${key}`.toLowerCase()
                returnObj[associatedKey] = value !== null ? value : {};
            }
            return returnObj;
        }();

        setState(stateObject);
    }

    const renderAssetList = (asset, name) => {
        const associatedKey = `selection-${name}`.toLowerCase()

        if (!state[associatedKey] || !state[associatedKey].url) {
            return <div/>
        }
        return <div style={classes.root}>
            <List style={{backgroundColor: '#ffffff', color: '#000000'}} subheader={<li />}>
                {state[associatedKey].url.map((element: JsonMusicUrl) => (
                    <li key={element.link} style={classes.listSection}>
                        <ul style={classes.ul}>
                            <ListItem button onClick={event => redirectToUrl(event, element.link)} key={`item-${element.link}`}>
                                <ListItemText primary={element.link} />
                            </ListItem>
                        </ul>
                    </li>
                ))}
            </List>
        </div>
    }

    const renderAssetSearch = (asset, name) => {
        const associatedValue = `selection-${name}`
        return <div style={{
            backgroundColor: '#ffffff',
            display: 'inline-block',
            'verticalAlign': 'middle'}}>
            <Autocomplete color='inherit'
                          onChange={onListSearchUpdate}
                          id={`combo-box-${name}`}
                          options={asset}
                          getOptionLabel={(option) => option.title}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} value={state[associatedValue]} label={name} variant="outlined" />}
            />
            {renderAssetList(asset, name)}
        </div>
    }

    const navigateToMenu = () => {
        navigate('/')
    }

    return <div>
        <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
        <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={navigateToMenu}>
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
            {renderAssetSearch(assetManager.themeList.games.flatMap(), 'Games')}
            {renderAssetSearch(assetManager.themeList.animes.flatMap(), 'Animes')}
            {renderAssetSearch(assetManager.themeList.songs.flatMap(), 'Musics')}
            {renderAssetSearch(assetManager.themeList.movies.flatMap(), 'Movies')}
            {renderAssetSearch(assetManager.themeList.series.flatMap(), 'Series')}
            {renderAssetSearch(assetManager.themeList.tvShows.flatMap(), 'TV shows')}
        </div>
        <Copyright />
    </div>
}