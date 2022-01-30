import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import Preloader from '../spinner/Preloader';
import { Error } from '../error/Error';

class CharList extends Component {
    
    state = {
        chars: [],
        isLoading: true,
        isError: false,
    }

    server = new ComicsAPI();

    componentDidMount() {
        this.setState({isLoading: true})
        this.server.getAllCharacters()
            .then(this.addedChars) 
            .catch(this.errorCatched)
    }

    addedChars = (res) => {
        const newArray = res.map(res => ({
            name: res.name,
            thumbnail: res.thumbnail,
            id: res.id
        }))
        this.setState({
            chars: newArray,
            isError: false,
            isLoading: false
        })
    }
    
    errorCatched = () => {
        this.setState({
            isLoading: false, 
            isError: true
        })
    }

    // onCharSelected = (e) => {
    //     this.props.changeCharSelected(e.currentTarget.getAttribute("data-id"))
    // }

    render() {
        const {chars, isLoading, isError} = this.state
        const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        const charArray = !(isLoading || isError) && chars.map(el => {
            return (
                <li className="char__item" key={el.id} onClick={() => this.props.changeCharSelected(el.id)}>
                    <img src={el.thumbnail} alt="abyss" style={(el.thumbnail === notFoundImgLink) ? {objectFit: 'contain'} : {objectFit: 'cover'}}/>
                <div className="char__name">{el.name}</div>
            </li>   
            )
        });
        const loading = isLoading && <Preloader/>
        const error = isError && <Error/>

        return (
            <div className="char__list">
                {loading}
                {error}
                <ul className="char__grid">                    
                    {charArray}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
 
}

export default CharList;