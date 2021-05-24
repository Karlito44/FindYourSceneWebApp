import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SimpleModal from "../modal/SimpleModal";
import './City.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function CityCard({listFilms, city, title, description, image}) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
          </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions> */}
                <div id="button">
                <SimpleModal listFilms={listFilms} city={city} title={"Liste des films de la ville de " + title} buttonName="Consulter les films" />
                </div>
            {/* </CardActions> */}
        </Card>
    );
}
