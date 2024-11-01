import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const {id} = useParams()

    //state
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime

    //get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    }

    //get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log(data.data);
    }


    //initial render
    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [])

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less': 'Read More'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
                
        </AnimeItemStyled >
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background: linear-gradient(145deg, #000040, #001060); /* Background gradien lebih keren */
    min-height: 100vh;
    color: #e0e4f1; /* Warna teks utama agar kontras */

    h1 {
    font-family: 'Bebas Neue', sans-serif;
    background: linear-gradient(45deg, #f0a, #00f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 4rem;
}

    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient(to right, #80ff80 23%, #ff80bf); /* Warna gradien pada teks */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description {
        margin-top: 2rem;
        color: #c1c8e4;
        line-height: 1.7rem;
        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #80ff80;
            font-weight: 600;
            transition: color 0.3s ease;
            &:hover {
                color: #ff80bf; /* Ubah warna pada hover */
            }
        }
    }

    .trailer-con {
        display: flex;
        justify-content: left;
        align-items: center;
        iframe {
            outline: none;
            border: 5px solid #80ff80;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #000040;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3); /* Shadow untuk kedalaman */
        }
    }

    .details {
        background: rgba(0, 0, 64, 0.85); /* Warna latar yang disesuaikan */
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #80ff80;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5); /* Shadow */
        
        .detail {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            img {
                border-radius: 10px;
                transition: transform 0.3s ease;
                &:hover {
                    transform: scale(1.05); /* Efek zoom pada gambar */
                }
            }
        }
        
        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                display: flex;
                gap: 1rem;
                font-size: 1rem;
                color: #c1c8e4;
            }
            p span:first-child {
                font-weight: 600;
                color: #80ff80;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background: rgba(0, 0, 64, 0.85);
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #80ff80;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5); /* Shadow untuk kedalaman */

        .character {
            padding: 0.5rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
            color: #e0e4f1;

            img {
                width: 100%;
                border-radius: 5px;
            }
            h4 {
                padding: 0.5rem 0;
                color: #ff80bf;
            }
            p {
                color: #80ff80;
            }
            &:hover {
                transform: translateY(-5px); /* Sedikit naik ke atas pada hover */
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
            }
        }
    }
`;

export default AnimeItem;