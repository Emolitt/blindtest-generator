import React from "react";
import {Box, Button, FormControl, List, ListItem} from "@material-ui/core";
import {Helmet} from "react-helmet";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AssetsManager from "../Database/AssetsManager";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';
import Copyright from "../Copyright";

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

export default class SuggestPage extends React.Component {
    constructor() {
        super();

        this.state = {
            assetName: "",
            theme: "games",
            urlList: []
        }
        this.navigateToAssets = this.navigateToAssets.bind(this)
        this.submitSuggestion = this.submitSuggestion.bind(this)
        this.onAssetSearchChange = this.onAssetSearchChange.bind(this)
        this.onAssetSubmitChange = this.onAssetSubmitChange.bind(this)
        this.setOpen = this.setOpen.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onAddUrl = this.onAddUrl.bind(this)
        this.onRemoveUrl = this.onRemoveUrl.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
    }

    handleChange(event) {
        this.setState({
            theme: event.target.value
        })
    };
    setOpen(state) {
        this.setState({
            opened: state
        })
    }

    handleClose() {
        this.setOpen(false);
    }

    handleOpen() {
        this.setOpen(true);
    }

    onAssetSubmitChange(event, value) {
        this.setState({
            assetName: value ? value.name : ""
        })
    }

    onAssetSearchChange(event) {
        const value = event.target.value
        this.setState({
            assetName: value ? value : ""
        })
    }

    onAddUrl(event) {
        this.state.urlList.push({
            link: "",
            start: 0
        })
        this.setState({
            urlList: this.state.urlList
        })
    }

    onRemoveUrl(index) {
        const isUrlFound = index >= 0 && index < this.state.urlList.length

        if (isUrlFound) {
            this.state.urlList.splice(index, 1)
            this.setState({
                urlList: this.state.urlList
            })
        }
    }

    onChangeUrl(index, value, isLink) {
        const isUrlFound = index >= 0 && index < this.state.urlList.length

        if (isUrlFound) {
            const urlList = this.state.urlList
            if (isLink) {
                urlList[index].link = value
            } else {
                urlList[index].start = parseInt(value)
            }
            this.setState({
                urlList: urlList
            })
        }
    }

    renderAssetSearch(asset, name) {
        return <div style={{
            backgroundColor: '#ffffff',
            display: 'inline-block',
            'verticalAlign': 'middle'}}>
            <Autocomplete freeSolo color='inherit'
                          onInput={this.onAssetSearchChange}
                          onChange={this.onAssetSubmitChange}
                          id={`combo-box-${name}`}
                          options={asset}
                          getOptionLabel={(option) => option.name}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} value={this.state.assetName} label={name} variant="outlined" />}
            />
        </div>
    }

    renderUrlList() {
        return <div style={classes.root}>
            <List style={{backgroundColor: '#ffffff', color: '#000000'}} subheader={<li />}>
                {this.state.urlList.map((element, index) => {
                    return <li key={index} style={classes.listSection}>
                        <ul style={classes.ul}>
                            <ListItem key={`item-${index}`}>
                                <TextField value={element.link} label="link" onChange={(event) => this.onChangeUrl(index, event.target.value, true)}/>
                                <TextField type="number" value={element.start} label="start" onChange={(event) => this.onChangeUrl(index, event.target.value, false)}/>
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>} onClick={event => this.onRemoveUrl(index)} />
                            </ListItem>
                        </ul>
                    </li>
                })}
            </List>
        </div>
    }

    submitSuggestion() {
        //Submit
        /*
        assetName: "",
            theme: "games",
            urlList: []
         */
        const name = this.state.assetName
        const theme = this.state.theme
        const url = this.state.urlList

        if (!name || !theme || url.length <= 0) {
            console.log(name)
            alert("missing arguments name or theme or url")
            return
        }

        let error = false
        url.forEach((link, index) => {
            if (!link.link || link.start < 0) {
                alert("Wrong argument in url nb " + index)
                error = true
            }
        })

        if (error) {
            return
        }

        const asset = {
            theme: theme,
            name: name,
            url: url
        }
        AssetsManager.suggestNewAsset(asset)
    }

    navigateToAssets() {
        this.props.history.push('/assets')
    }

    render() {
        return <div>
            <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
            <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={this.navigateToAssets}>
                Cancel
            </Button>
            <Box align='center'>
                <FormControl component="fieldset" style={{ marginTop: '5%' }}>
                    <Select
                        labelId="select-asset-theme"
                        id="select-asset-theme"
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.theme}
                        onChange={this.handleChange}
                        style={{backgroundColor: '#ffffff'}}
                        inputProps={{
                            style: {
                                color: 'white'
                            }
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value='games'>Video Games</MenuItem>
                        <MenuItem value='animes'>Anime</MenuItem>
                        <MenuItem value='films'>Films</MenuItem>
                        <MenuItem value='musics'>Musics</MenuItem>
                    </Select>
                    {this.state.theme === 'games' && this.renderAssetSearch(AssetsManager.ThemeList.games, "Asset Name")}
                    {this.state.theme === 'animes' && this.renderAssetSearch(AssetsManager.ThemeList.animes, "Asset Name")}
                    {this.state.theme === 'films' && this.renderAssetSearch(AssetsManager.ThemeList.films, "Asset Name")}
                    {this.state.theme === 'musics' && this.renderAssetSearch(AssetsManager.ThemeList.musics, "Asset Name")}
                    {this.renderUrlList()}
                    {this.state.theme && <Button variant="contained" style={{backgroundColor: '#4a6b58'}} onClick={this.onAddUrl}>
                        Add Url
                    </Button>}
                </FormControl>
            </Box>
            <div  style={{
                position: 'fixed',
                bottom: '77px',
                right: '20px'
            }}>
                <Button
                    variant="contained"
                    style={{backgroundColor : '#0FDC06'}}
                    onClick={this.submitSuggestion}
                >
                    Suggest Asset
                </Button>
            </div>
            <Copyright/>
        </div>
    }
}