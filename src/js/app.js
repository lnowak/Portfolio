import React, {Component} from "react";
import ReactDOM from 'react-dom';

import './../sass/style.scss'; // adres do głównego pliku SASS

const tab = [{id: 1, checked: false},{id: 2, checked: false}, {id: 3, checked: false},{id: 4, checked: false},{id: 5, checked: false}];

class App extends Component {
    render() {
        return (
            <div className='container'>
                <Dice tab={tab} />
                {/*<Table />*/}
            </div>
        )
    }
}

class Dice extends Component {
    state = {
        tab: this.props.tab,
        rollAgain: false,
    };

    changeRollAgain = () => {
        this.setState({
            rollAgain: !this.state.rollAgain
        })
    };

    handleClick = (e) => {
        const id = Number(e.currentTarget.dataset.id);
        // console.log(id);
        const newTab = this.state.tab.map(cube => {
            if (cube.id === id) {
                cube.checked = !cube.checked;
            }
            return cube
        });

        this.setState({
            tab: newTab
            }
        )
    };

    render() {
        // console.log('render');
        return (
            <div id="board">
                {this.state.tab.map( el => {

                    let diceClass = `cube${el.id}` + (el.checked ? ' checked': '') ;

                    if (el.checked !== true && this.state.rollAgain === true) {
                        // console.log(el.checked, this.state.rollAgain);
                        const genRandom = Math.round(Math.random()*((6-1)+1));
                        console.log(genRandom);
                        diceClass = `cube${el.id}` + ` anim${genRandom}` ;
                    }

                    return (
                        <div key={el.id} className={diceClass} onClick={this.handleClick} data-id={el.id}>
                            <div className="one">
                                <div className='dot'/>
                            </div>
                            <div className="two">
                                <div className='dot'/>
                                <div className='dot'/>
                            </div>
                            <div className="three">
                                <div className='dot'/>
                                <div className='dot'/>
                                <div className='dot'/>
                            </div>
                            <div className="four">
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                            </div>
                            <div className="five">
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                                <div className="dotRow">
                                    <div className='dot'/>
                                </div>
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                            </div>
                            <div className="six">
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                                <div className="dotRow">
                                    <div className='dot'/>
                                    <div className='dot'/>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <RollButton roll={this.changeRollAgain}>Roll the Dice!!!</RollButton>
            </div>
        )
    }
}

class RollButton extends Component {


    handleClick = (e) => {
        const button = e.target;
        button.disabled = true;
        if (typeof this.props.roll === 'function') {
            this.props.roll();
            setTimeout(() => {
                this.props.roll();
                button.disabled = false;
            },5000)
        }
    };

    render() {

        return (
            <button className='button' onClick={this.handleClick}>Roll the Dice!!!</button>
        )
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <>
            <App tab={tab} />
        </>,
        document.getElementById('app')
    )
});

