import React from 'react'
import AdSense from 'react-adsense'

const Ad = () => {


    return (
        <AdSense.Google
            client='ca-pub-1418606837782831'
            slot='7806394673'
            style={{display: 'block'}}
            layout='in-article'
            format='fluid'
        />
    )

}


export default Ad
