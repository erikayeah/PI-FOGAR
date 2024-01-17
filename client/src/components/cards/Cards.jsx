import Card from "../card/Card";
import styles from "../cards/Cards.module.css";

const Cards = ({ pokemons }) => {
  const renderCards = () => {
    if (!pokemons || pokemons.length === 0) {
      return (
        <p className={styles.text}> Oops, there are no pokemon to show </p>
      );
    }

    return pokemons.map((pokemon, index) => (
      <Card key={index} pokemon={pokemon} />
    ));
  };

  return <div className={styles.container}>{renderCards()}</div>;
};

export default Cards;
