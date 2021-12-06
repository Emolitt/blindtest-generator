import React from "react";
import {
    Button,
} from "@mui/material";
import {Helmet} from "react-helmet";
import {Copyright} from "../../components";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import './ContributorsPage.scss'
import PropTypes from 'prop-types';
import profilePicture from '../../resources/background.JPG';
import malo from '../../resources/contributors/malo.jpg';
import hugo from '../../resources/contributors/hugo.jpg';
import jules from '../../resources/contributors/jules.jpg';
import leo from '../../resources/contributors/leo.jpg';
import paul from '../../resources/contributors/paul.jpg';
import gomes from '../../resources/contributors/gomes.jpg';
import roland from '../../resources/contributors/roland.jpg';
import valentin from '../../resources/contributors/valentin.jpg';
import dorian from '../../resources/contributors/dorian.jpg';
import romain from '../../resources/contributors/romain.jpg';

const developers = [
    {
        profile: romain,
        name: "Romain Jolidon",
        description: "Project leader"
    },
    {
        profile: gomes,
        name: "Dorian Gomes",
        description: "Simple developer (nothing submitted yet)"
    }
];

const moderators = [
    {
        profile: dorian,
        name: "Dorian You",
        description: "Asset Manager"
    },
    {
        profile: jules,
        name: "Jules Fournier",
        description: "Blindtest Mastermind"
    },
    {
        profile: malo,
        name: "Malo de Dinechin",
        description: "Bad quality Researcher"
    }
];

const betaTesters = [
    {
        profile: dorian,
        name: "Dorian You",
        description: "Beta tester"
    },
    {
        profile: gomes,
        name: "Dorian Gomes",
        description: "Beta tester"
    },
    {
        profile: roland,
        name: "Roland de Verneuil",
        description: "Beta tester"
    },
    {
        profile: jules,
        name: "Jules Fournier",
        description: "Beta tester"
    },
    {
        profile: malo,
        name: "Malo de Dinechin",
        description: "Beta tester"
    },
    {
        profile: paul,
        name: "Paul van Kerckvoorde",
        description: "Beta tester"
    },
    {
        profile: valentin,
        name: "Valentin Gandon",
        description: "Beta tester"
    },
    {
        profile: leo,
        name: "Léocadie de Dinechin",
        description: "Beta tester"
    },
    {
        profile: hugo,
        name: "Hugo Boichard",
        description: "Beta tester"
    }
];

const buttonStyle = (customColor) => {
    return {
        backgroundColor : customColor,
        marginTop: '1%',
        marginLeft: '1%',
        width: '10%',
        height: '40px'
    }
}


function ContributorSection(props) {
    return <div className="contributors-section-container">
        <h1>{props.title}</h1>
        {props.contributors.map(contributor => {
            return <div className="contributor-section-item">
                <img alt="img" src={contributor.profile}/>
                <div>
                    <p className="contributor-name">{contributor.name}</p>
                    <p className="contributor-description">{contributor.description}</p>
                </div>
            </div>
        })}
    </div>
}

ContributorSection.propTypes = {
    title: PropTypes.string.isRequired,
    contributors: PropTypes.array.isRequired
}

export default function ContributorsPage() {
    const navigate = useNavigate();

    const navigateToMenu = () => {
        navigate('/')
    }

    return <div style={{ overflow: 'hidden'}}>
        <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
        <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={navigateToMenu}>
            Menu
        </Button>
        <div className="contributors-grid-container">
            <Grid container justifyContent="center" spacing={2}>
                <Grid key={0} item xs={4} className="contributors-grid-item">
                    <ContributorSection title="Developers" contributors={developers}/>
                </Grid>
                <Grid key={1} item xs={4} className="contributors-grid-item">
                    <ContributorSection title="Moderators" contributors={moderators}/>
                </Grid>
                <Grid key={2} item  xs={4} className="contributors-grid-item">
                    <ContributorSection title="Beta Testers" contributors={betaTesters}/>
                </Grid>
            </Grid>
        </div>
        <Copyright />
    </div>
}