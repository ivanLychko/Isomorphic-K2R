const path = require('path');

module.exports = {
    PROJECT_ROOT: path.normalize(__dirname + '/../'),
    DIR_COMPONENTS: path.normalize(__dirname + '/../src/components/'),
    DIR_MODELS: path.normalize(__dirname + '/../src/models/'),
    DIR_SEEDS: path.normalize(__dirname + '/../src/seeds/'),
    DIR_HELPERS: path.normalize(__dirname + '/../src/helpers/'),
    DIR_VIEWS: path.normalize(__dirname + '/../src/views/'),
    PATH_BASE:   path.normalize(__dirname + '/db'),
    DIR_CLASSES: path.normalize(__dirname + '/../src/classes/'),
    DIR_CONFIG: path.normalize(__dirname + '/../config/'),
    DIR_PUBLIC: path.normalize(__dirname + '/../public/')
};