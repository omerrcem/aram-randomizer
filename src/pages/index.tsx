import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NameEntry from '@/partials/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>LoL Aram Randomizer</title>
        <meta name="description" content="Aram randomizer By Omer Cem Turan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NameEntry />
      <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
        By OCT
        <br />
        Hayri Abi Corp.
      </div>
    </>
  )
}
