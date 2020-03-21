import React from 'react'

const LoadingPage = () => {

  return (
    <div className="loadingWrapper">
      <span className="loadingCenterSpace">LOADING</span>
      <style jsx>
        {`
          .loadingWrapper {
            min-height: calc(100vh);
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(144deg, #00D0BB, #0191DE 48%, #BF3FF5);
          }
          .loadingCenterSpace {
            font-weight: bold;
            color: #fff;
          }
        `}
      </style>
    </div>
  )
  
}

export default LoadingPage