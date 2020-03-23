import React from 'react'

const LoadingPage = () => {

  return (
    <div className="loadingWrapper">
      <span className="loadingCenterSpace">
        <img className="triangle" src="/triangle.svg" alt="" />
        <span>LOADING</span>
        
      </span>
      <style jsx>
        {`
          .loadingWrapper {
            min-height: calc(100vh);
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(144deg, #333, #222 48%, #111);
          }
          .loadingCenterSpace {
            font-weight: bold;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .triangle {
            width: 120px;
            height: auto;
            margin: 30px;
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