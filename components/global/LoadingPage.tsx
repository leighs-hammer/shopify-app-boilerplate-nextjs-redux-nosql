import React from 'react'
import colorSet from '../../_constants/colorSets'

const LoadingPage = () => {

  return (
    <div className="loadingWrapper">
      <span className="loadingCenterSpace">
        <img className="triangle" src="/triangle.svg" alt="" />
        <span className="loadingText">LOADING</span>
        
      </span>
      <style jsx>
        {`
          .loadingWrapper {
            min-height: calc(100vh);
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(144deg, ${colorSet.indigo.Lighter}, ${colorSet.indigo.Lighter} 48%,  ${colorSet.indigo.Lighter});
          }
          .loadingCenterSpace {
            font-weight: bold;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .loadingText {
            color: ${colorSet.indigo.Text};
          }
          .triangle {
            width: 120px;
            height: auto;
            margin: 30px;
            opacity: 0.6;
            animation: rotation 5s infinite linear;
          }

          @keyframes rotation {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(359deg);
          }
}
        `}
      </style>
    </div>
  )
  
}

export default LoadingPage