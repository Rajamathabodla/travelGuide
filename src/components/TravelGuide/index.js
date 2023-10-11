import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const url = 'https://apis.ccbp.in/tg/packages'

class TravelGuide extends Component {
  state = {isLoading: true, listApi: []}

  componentDidMount() {
    this.getTravelImages()
  }

  getTravelImages = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const updateData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    this.setState({listApi: updateData, isLoading: false})
  }

  render() {
    const {isLoading, listApi} = this.state
    return (
      <div className="background">
        <h1 className="tarvelHeading">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-cards-ul">
            {listApi.map(eachOf => (
              <li key={eachOf.id} className="travel-card">
                <img
                  className="travel-img"
                  src={eachOf.imageUrl}
                  alt={eachOf.name}
                />
                <h1 className="travel-heading"> {eachOf.name}</h1>
                <p className="travel-des"> {eachOf.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default TravelGuide
