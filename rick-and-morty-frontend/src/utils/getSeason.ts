export const getEpisode = (episode: string) => {
    const [season, episodeNumber] = episode.split('E');
    return {
        season: parseInt(season.replace('S', '')),
        episode: parseInt(episodeNumber),
    };
}
