import React, { ReactChildren } from 'react'
import Link from 'next/link'

/**
 * Polaris links are now Next JS Links!
 */

 interface CustomLinkProps {
   children?: React.ReactChildren,
   url: string,
   rest?: any
 }


const CustomLink:React.FC<CustomLinkProps> = ({children, url, ...rest}) => {

  return (
    <Link href={url}>
      <a
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
  
}

export default CustomLink