import React from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import styled from 'styled-components';
import Upcoming from './Upcoming';
import Airing from './Airing';

function Homepage() {
    const { handleSubmit, search, handleChange, getUpcomingAnime, getAiringAnime } = useGlobalContext();
    const [rendered, setRendered] = React.useState('popular');

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    }

    return (
        <HomepageStyled>
            <header>
                <div className="logo">
                    <h1 className="title">
                        {rendered === 'popular' ? 'Watashi RizkiMaulana' : 
                        rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={() => setRendered('popular')}>Popular<i className="fas fa-fire"></i></button>
                    </div>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Cari Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing');
                            getAiringAnime();
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming');
                            getUpcomingAnime();
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    );
}

const HomepageStyled = styled.div`
    background: linear-gradient(45deg, 
        rgba(135, 206, 235, 0.7), /* Light Sky Blue */
        rgba(173, 216, 230, 0.7), /* Light Blue */
        rgba(144, 238, 144, 0.7), /* Light Green */
        rgba(255, 228, 196, 0.7), /* Bisque */
        rgba(255, 182, 193, 0.7), /* Light Pink */
        rgba(221, 160, 221, 0.7), /* Plum */
        rgba(240, 230, 140, 0.7)  /* Khaki */
    ); /* Latar belakang gradasi RGB kalem */
    color: #333; /* Warna teks lebih gelap untuk kontras */
    font-family: 'Arial', sans-serif; /* Font lebih sederhana */

    header {
        padding: 2rem 5rem;
        width: 60%;
        margin: 0 auto;
        transition: all .4s ease-in-out;

        @media screen and (max-width: 1530px) {
            width: 95%;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .title {
            font-family: 'Sacramento', cursive; /* Gaya font keren */
            font-size: 4rem; /* Ukuran font lebih besar */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Bayangan teks untuk efek 3D */
            color: #ffffff; /* Warna teks putih untuk kontras */
            text-align: center; /* Pusatkan teks */
        }

        .search-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            button {
                display: flex;
                align-items: center;
                gap: .5rem;
                padding: .7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #f0c0c0; /* Warna tombol lembut */
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 3px solid #e5e7eb; /* Border tombol */
                color: #333; /* Warna teks tombol */
            }

            form {
                position: relative;
                width: 100%;

                .input-control {
                    position: relative;
                    transition: all .4s ease-in-out;

                    input {
                        width: 100%;
                        padding: .7rem 1rem;
                        border: none;
                        outline: none;
                        border-radius: 30px;
                        font-size: 1.2rem;
                        background-color: #fff; /* Warna latar belakang input */
                        color: #333; /* Warna teks input */
                        border: 3px solid #e5e7eb; /* Border input */
                        transition: all .4s ease-in-out;

                        &:focus {
                            border-color: #f0c0c0; /* Border input saat fokus */
                        }
                    }

                    button {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #f0c0c0; /* Warna tombol dalam input */
                        border: none; /* Hilangkan border */
                        border-radius: 30px; /* Bulatkan sudut */
                        cursor: pointer; /* Kursor pointer */
                    }
                }
            }
        }
    }
`;

export default Homepage;
