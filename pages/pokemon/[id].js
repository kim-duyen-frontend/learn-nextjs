import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from "../../styles/Detail.module.scss";

export async function getServerSideProps({ params }) {
    const response = await axios.get(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);
    return {
        props: {
            pokemon: response?.data
        }
    }
}
function DetailPokemon({ pokemon }) {
    const router = useRouter()

    return (
        <div className={styles.detail}>
            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.colLeft}>
                        <div className={styles.image}>
                            <Image
                                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                                alt={pokemon.name}
                                width={300}
                                height={300}
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.colRight}>
                        <h2 className={styles.name}>{pokemon.name}</h2>
                        {pokemon.type.map((type, index) => {
                            return <span className={styles.tag} key={index}>{type}</span>
                        })}
                        <div className={styles.power}>
                            {pokemon.stats.map((item, index) => (
                                <div className={styles.values} key={index}>
                                    <p className={styles.title}>{item.name}</p>
                                    <p className={styles.value}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.action}>
                    <button className={styles.btnBack} onClick={() => router.push('/')}>Back home</button>
                </div>
            </div>
        </div>
    );
};

export default DetailPokemon;