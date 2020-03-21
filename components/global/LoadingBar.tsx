import React from 'react'
import {useSelector} from 'react-redux'
import colorSet from '../../_constants/colorSets'

const LoadingBar = () => {

  // color
  const accent = colorSet.indigo.Indigo
  // state
  const loading = useSelector(state => state.loading)
    
  return (
    <div className="LoadingBar">
      {loading ? (<span className="Indicator" data-text="loading" style={{backgroundColor: accent }}>Loading</span>) : ''}
      <style jsx>
        {`
          .LoadingBar {
            width: 100%;
            min-width: 100%;
            height: 3px;
            display: flex;
            justify-content: center;
            overflow: hidden;
            position: fixed;
          }
          .Indicator {
            animation: SPAN-SPACE 3s infinite;
            text-indent: -999em;
            display: block;
            border-radius: 2px;
            background-color: ${accent ? accent : '#cccc'};
            background-image: linear-gradient(144deg, #00D0BB, #0191DE 48%, #BF3FF5);
          }
          @keyframes SPAN-SPACE{
            0%   { width: 0%; }
            75% {width: 100%;}
            100% { width: 0%; }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingBar