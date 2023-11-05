import { useSelector } from "react-redux";
import style from './Favorites.module.scss';
import CharacterCSGrid from "@/components/Grid/CharacterCSGrid";

const Favorites = () => {
  const favorites = useSelector((state: any) => state.userSelections.favorites);

  return (
    <div>
      <h1>Favorites</h1>
      <div className={style.favorites}>
        {
          favorites?.length > 0 ?
            <CharacterCSGrid characters={favorites} /> :
            <p>You don't have any favorite character yet</p>
        }
      </div>
    </div >
  )
}

export default Favorites