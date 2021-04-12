import React from 'react'

export default function TheFooter() {
    return (
        <footer className='mt8 md:mb0' id='footer'>
            <hr className='border borderGray5'/>
            <div className='containerMid textCenter textSm textGray4 pt2 pb2'>
                <i className="fas fa-code"></i> by <a href="https://github.com/akshay-rajput" rel='noopener noreferrer' target='_blank' className="textTeal4 hover:textTeal2">Akshay</a>
            </div>
        </footer>
    )
}
