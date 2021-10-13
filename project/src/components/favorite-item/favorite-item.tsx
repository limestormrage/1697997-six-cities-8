import { Offers } from '../../types/offer';
import ItemCard from '../card/card';

type FavoriteItemProps = {
  city: string,
  cards: Offers
}

function FavoriteItem({city, cards}: FavoriteItemProps): JSX.Element {
  const cityProposals = cards.filter((card) => city === card.city.name );

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {cityProposals.map((card) => <ItemCard card={card} typeCard={'favorite'} key={card.id}/>)}
      </div>
    </li>
  );
}

export default FavoriteItem;