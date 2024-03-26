import React from 'react'
import './preLoginFooter.scss'
const PreLoginFooter = () => {
    return (
        <div className='prelogin__footer'>
            <div className="prelogin__footer__inner">
                {/* Footer */}
                <div className="footer__header">
                    <div className="navbar__logo">
                        Clothy <span>Go</span>
                    </div>
                    
                </div>

                <div className="footer__body">
                    <div className="footer__body__col">
                        <p className="footer__body__col__heading">About Clothy Go</p>
                        <p className="footer__body__col__option">Who we are</p>
                        <p className="footer__body__col__option">Blog</p>
                        <p className="footer__body__col__option">Work with Us</p>
                        <p className="footer__body__col__option">Report fraud</p>
                        <p className="footer__body__col__option">Contact Us</p>
                    </div>
                    <div className="footer__body__col">
                        <p className="footer__body__col__heading">For Shops</p>
                        <p className="footer__body__col__option">Partner with us</p>
                        <p className="footer__body__col__option">Shop Support</p>
                        <p className="footer__body__col__option">Apps for you</p>
                    </div>
                    <div className="footer__body__col">
                        <p className="footer__body__col__heading">LEARN MORE</p>

                        <p className="footer__body__col__option">Privacy</p>
                        <p className="footer__body__col__option">Security</p>
                        <p className="footer__body__col__option">Terms</p>
                        <p className="footer__body__col__option">Faq's</p>
                    </div>
                    <div className="footer__body__col">
                        <p className="footer__body__col__heading">Socials</p>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreLoginFooter
