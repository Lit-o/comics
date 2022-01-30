

class ComicsAPI {
    // constructor() {
    //     this.firstUrl = 'https://gateway.marvel.com:443/v1/public/characters?apikey=398655cdc1734b6cf20b524ab0453ef7'
    // }
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=398655cdc1734b6cf20b524ab0453ef7';
    groupUrl = 'characters';    
    limit = 'limit=9';
    offset = 'offset=210';
    getAllCharactersUrl = this._apiBase + this.groupUrl + '?' + this.limit + '&' + this.offset + '&' + this._apiKey; 

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status - ${res.status}`);
        }
        return await res.json();
    }

    // getAllCharacters = () => {
    //     return this.getResource(this.getAllCharactersUrl)
    // }
    getAllCharacters = async () => {
        const res = await this.getResource(this.getAllCharactersUrl);
        return res.data.results.map(this._transformCharData);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(this._apiBase + this.groupUrl + '/' + id + '?' + this._apiKey);
        return this._transformCharData(res.data.results[0]);
    }

    _transformCharData = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description || 'information is classified',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default ComicsAPI;