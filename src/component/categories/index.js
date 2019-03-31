import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridList from '@material-ui/core/GridList'
import React from 'react'

function defaultImg(e) {
    e.target.src ='./static/other.jpg'
}

const renderCategory = ({ classes, handleOnClick }) => ({id, name}) => (
    <GridListTile key={id} onClick={() => handleOnClick(id)} style={{ padding: 1 }}>
        <img src={`./static/${id}.jpg`} alt={name} onError={defaultImg}/>
        <GridListTileBar
            title={name}
            className={classes.MuiGridListTileBar}
            classes={{ title: classes.MuiGridListTileBar }}
        />
    </GridListTile>
)

export default function ({ data = [], classes = {}, handleOnClick }) {
    return (
        <GridList cellHeight={180} className={classes.gridList} style={{ margin: classes.gridList }}>
            {data.map(renderCategory({ classes, handleOnClick }))}
        </GridList>
    )
}