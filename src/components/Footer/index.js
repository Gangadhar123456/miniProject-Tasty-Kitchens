import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-heading-container">
      <img
        src="https://res.cloudinary.com/nsp/image/upload/v1635840304/tastyKitchens/logowhite_t8wfhc.png"
        alt="website-footer-logo"
        className="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-container">
      <a
        href="https://in.pinterest.com/search/pins/?q=web%20development&rs=typed"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="social-icon"
          />
        </span>
      </a>
      <a
        href="https://www.instagram.com/explore/tags/kitchen/"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <FaInstagram testid="instagram-social-icon" className="social-icon" />
        </span>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noreferrer">
        <span>
          <FaTwitter testid="twitter-social-icon" className="social-icon" />
        </span>
      </a>
      <a
        href="https://www.facebook.com/DreamWorksHome/"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="social-icon"
          />
        </span>
      </a>
    </div>
  </div>
)

export default Footer
