import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    map: {
        width: "100%",
        height: "auto"
    }
});

export default function Map({ adresse }) {
    const classes = useStyles();
    const urlMap = "https://www.google.com/maps/search/?api=1&query=" + {adresse};


    return (
        <div>
            <iframe className={classes.map} id="" src="urlMap">

            </iframe>
        </div>
    );
}
