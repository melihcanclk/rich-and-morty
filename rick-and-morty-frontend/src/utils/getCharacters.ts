import { CharacterModel, InfoModel } from "@/types/";
import { BASE_URL } from "@/utils/constants";

export const CHARACTER = BASE_URL + '/character';
export const EPISODE = BASE_URL + '/episode';

interface Props {
    page: number;
    search?: string;
    status?: string;
    species?: string;
    gender?: string;
}

interface getCharactersInterface {
    info: InfoModel;
    results: CharacterModel[];
    error: string;
    p: number;
}

export const getCharacters = async ({ search, page = 1, status, species, gender }: Props): Promise<getCharactersInterface> => {
    const query = `page=${page}&name=${search}&status=${status}&species=${species}&gender=${gender}`
    const { info, results, error } = await fetch(`${CHARACTER}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))
    return { info: info, results: results, error: error, p: error ? 1 : page }
}