const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const breakingBad = require('../services/breakingBadApi');

const getEpisodesBySeason = (episodes) => {
  const bBad = {};
  const bSaul = {};

  episodes.forEach((ep) => {
    if (ep.series === 'Breaking Bad') {
      if (!(ep.season in bBad)) {
        bBad[ep.season] = [];
      }
      bBad[ep.season].push(ep);
    } else {
      if (!(ep.season in bSaul)) {
        bSaul[ep.season] = [];
      }
      bSaul[ep.season].push(ep);
    }
  });

  return [bBad, bSaul];
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const episodes = await breakingBad.getEpisodes();
  const episodesBySeason = getEpisodesBySeason(episodes);

  const bBad = episodesBySeason[0];
  const bSaul = episodesBySeason[1];

  res.status(200).render('overview', {
    title: 'Home',
    bBad,
    bSaul,
  });
});

exports.getCharacter = catchAsync(async (req, res, next) => {
  const name = req.params.name.replace('_', '+');
  const characters = await breakingBad.getCharacterByName(name);
  const character = characters[0];

  if (characters.length === 0) {
    return next(new AppError('Character Not Found', 400));
  }

  const episodes = await breakingBad.getEpisodes();

  const episodesBySeason = getEpisodesBySeason(episodes);

  const bBad = episodesBySeason[0];
  const bSaul = episodesBySeason[1];

  const bBadAppearance = {};
  const bSaulAppearance = {};

  character.appearance.forEach((season) => {
    if (season in bBad) {
      bBadAppearance[season] = bBad[season];
    }
  });

  character.better_call_saul_appearance.forEach((season) => {
    if (season in bSaul) {
      bSaulAppearance[season] = bSaul[season];
    }
  });

  res.status(200).render('character', {
    title: 'Character',
    character,
    bBadAppearance,
    bSaulAppearance,
  });
});
