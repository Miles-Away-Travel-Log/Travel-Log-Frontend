
import Head from 'next/head'


export default function Layout({children}){
    return(
        <div>
            <Head>
             {children}

            </Head>
        </div>
                )
            }