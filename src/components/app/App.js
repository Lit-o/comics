import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

// import ComicsAPI from "../../api/ComicsAPI"

import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {
    state = {
        selectedChar: null
    }

    changeCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    render() {
        // console.log(this.state.selectedChar)
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList changeCharSelected={this.changeCharSelected}/>
                        <CharInfo charId={this.state.selectedChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;