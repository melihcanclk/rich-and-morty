import { useSelector } from "react-redux";
import style from '@/pages/Favorites/Favorites.module.scss';
import CharacterCSGrid from "@/components/Grid/CharacterCSGrid";
import Button from "@/components/Button";
import { openModalRemoveAll } from "@/features/slices/userSelectionsSlice";
import { useDispatch } from "react-redux";

const Favorites = () => {
  const favorites = useSelector((state: any) => state.userSelections.favorites);
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(openModalRemoveAll());
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div className={style.favorites}>

        {
          favorites?.length > 0 ?
            <>
              <Button
                onClick={handleClearFavorites}
              >
                Clear favorites
              </Button><CharacterCSGrid characters={favorites} />
            </> :
            <p>You don't have any favorite character yet</p>
        }
      </div>
    </div >
  )
}

export default Favorites