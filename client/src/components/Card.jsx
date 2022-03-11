import React from 'react';

export default function Card({name, nickname, image}){
    return(
        <div>
            <h2>{name}</h2>
            <h4>{nickname}</h4>
            <div>
                <img src={image} alt='image not found' width='200px' height='250px'/>
            </div>
        </div>
    )
}