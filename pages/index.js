import Head from 'next/head'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.scss'
import Link from 'next/link';
import axios from 'axios';

function Home() {
  const [listPokemon, setListPokemon] = useState([]);

  useEffect(() => {
    async function getAllPokemon() {
      const response = await axios.get("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
      setListPokemon(response?.data)
    }
    getAllPokemon();
  }, [])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Page Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
        <div className="container">
          <div className={styles.container}>
            {listPokemon.map((pokemon, index) => (
              <div className={styles.box} key={index}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>
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
                    <h3>{pokemon.name}</h3>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
export default Home;