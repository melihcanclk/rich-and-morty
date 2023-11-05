export const getEpisode = (episode: string) => {
    console.log(episode);
    const [season, episodeNumber] = episode.split('E');
    return {
        season: parseInt(season.replace('S', '')),
        episode: parseInt(episodeNumber),
    };
}
