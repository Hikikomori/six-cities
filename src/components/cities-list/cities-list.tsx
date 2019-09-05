import {connect} from "react-redux";

import {Operation as baseOperation} from "../../reducer/base/base";

const {setCity} = baseOperation;

interface Props {
  activeCity: string,
  cities: Array<string>,
  setCity: (city: string) => void
}

const CitiesList: React.FC<Props> = (props) => {
  const {
    activeCity,
    cities,
    setCity} = props;

  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, id) => {
          return <li className="locations__item" key={id}>
            <a className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`} href="#" onClick={(evt) => {
              evt.preventDefault();
              setCity(city);
            }}>
              <span>{city}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>
  </div>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.BASE.city,
  cities: state.BASE.cities,
});

const mapDispatchToProps = {
  setCity
};


export {CitiesList};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
