import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ReactSlider from '../ReactSlider'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantMenu extends Component {
  state = {
    restaurantList: [],
    activeOptionId: 'Lowest',
    currentPage: 0,
    apiStatus: apiStatusConstants.initial,
    search: '',
    isSearch: false,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, currentPage} = this.state
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${
      currentPage * 9
    }&limit=9&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        rating: restaurant.user_rating.rating,
        totalReviews: restaurant.user_rating.total_reviews,
      }))
      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurants)
  }

  onChangeSearch = e => {
    this.setState({search: e.target.value, isSearch: true})
  }

  renderRestaurantListView = () => {
    const {restaurantList, activeOptionId, search, isSearch} = this.state
    const searchResults = restaurantList.filter(eachRestaurant =>
      eachRestaurant.name.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <div className="render-container">
        {isSearch ? (
          <>
            <RestaurantHeader
              activeOptionId={activeOptionId}
              sortByOptions={sortByOptions}
              changeSortBy={this.changeSortBy}
            />
            <hr className="hr-line" />
            <br />
            <div className="input-logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/nsp/image/upload/v1635311275/tastyKitchens/websiteLogo_1x_fzy1tx.png"
                alt="website logo"
              />
              <input
                className="searchInput"
                onChange={this.onChangeSearch}
                value={search}
                placeholder="Search for restaurant "
              />
            </div>
            <br />
            <p className="search-name">Search Your Restaurant Here</p>
            <hr className="hr-line" />
            {searchResults.length === 0 ? (
              <div className="restaurant-error-view-container">
                <img
                  src="https://res.cloudinary.com/djjbttpq0/image/upload/v1641968177/Tasty%20Kitchens/erroring_1x_x7gtp8.png"
                  alt="restaurants failure"
                  className="restaurant-failure-img"
                />
                <h1 className="restaurant-failure-heading-text">
                  Page Not Found
                </h1>
                <p className="restaurant-failure-description">
                  we are sorry, we did,t find any data on your search
                </p>
                <button className="error-button" type="button">
                  Home Page
                </button>
              </div>
            ) : (
              <ul className="restaurant-list">
                {searchResults.map(restaurant => (
                  <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <RestaurantHeader
              activeOptionId={activeOptionId}
              sortByOptions={sortByOptions}
              changeSortBy={this.changeSortBy}
            />
            <hr className="hr-line" />
            <br />
            <div className="input-logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/nsp/image/upload/v1635311275/tastyKitchens/websiteLogo_1x_fzy1tx.png"
                alt="website logo"
              />
              <input
                className="searchInput"
                onChange={this.onChangeSearch}
                value={search}
                placeholder="Search for restaurant "
              />
            </div>
            <br />
            <p className="search-name">Search Your Restaurant Here</p>
            <hr className="hr-line" />
            <ul className="restaurant-list">
              {restaurantList.map(restaurant => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://res.cloudinary.com/djjbttpq0/image/upload/v1641968177/Tasty%20Kitchens/erroring_1x_x7gtp8.png"
        alt="restaurants failure"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading-text">Page Not Found</h1>
      <p className="restaurant-failure-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button className="error-button" type="button">
        Home Page
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="restaurant-loader-container">
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  leftArrowClicked = () => {
    const {currentPage} = this.state
    if (currentPage > 0) {
      this.setState(
        prev => ({currentPage: prev.currentPage - 1}),
        this.getRestaurants,
      )
    }
  }

  rightArrowClicked = () => {
    const {currentPage} = this.state
    if (currentPage < 3) {
      this.setState(
        prev => ({currentPage: prev.currentPage + 1}),
        this.getRestaurants,
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div>
        <ReactSlider />
        <div className="all-restaurant-responsive-container">
          {this.renderRestaurants()}
          <div className="restaurant-navigation">
            <button
              type="button"
              className="arrow-button"
              onClick={this.leftArrowClicked}
            >
              <img
                src="https://res.cloudinary.com/nsp/image/upload/v1635835069/tastyKitchens/Icon_1x_iq50dr.png"
                alt=""
                className="arrow"
              />
            </button>
            <span className="current-page">{currentPage + 1}</span>
            <button
              type="button"
              className="arrow-button"
              onClick={this.rightArrowClicked}
            >
              <img
                src="https://res.cloudinary.com/nsp/image/upload/v1635835103/tastyKitchens/Icon_1x_n6kori.png"
                alt=""
                className="arrow"
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantMenu
