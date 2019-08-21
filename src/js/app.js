import React, {Component} from "react";
import ReactDOM from 'react-dom';

import './../sass/style.scss'; // adres do głównego pliku SASS

const tab = [
    {id: 1, checked: false, number: (Math.round(Math.random()*(6-1)+1))},
    {id: 2, checked: false, number: (Math.round(Math.random()*(6-1)+1))},
    {id: 3, checked: false, number: (Math.round(Math.random()*(6-1)+1))},
    {id: 4, checked: false, number: (Math.round(Math.random()*(6-1)+1))},
    {id: 5, checked: false, number: (Math.round(Math.random()*(6-1)+1))}
    ];

class App extends Component {

    render() {
        return (
            <div className='container'>
                <Dice tab={tab} />
            </div>
        )
    }
}

class Dice extends Component {
    state = {
        tab: this.props.tab,
        rollAgain: false,
        counter: 1,
        currentPlayer: 1,
        scored: false
    };

    // changeScoredTrue = () => {
    //     console.log(this.state.scored);
    //     this.setState({
    //         scored: true,
    //     })
    // };
    //
    // changeScoredFalse = () => {
    //     console.log(this.state.scored);
    //     this.setState({
    //         scored: false,
    //     })
    // };

    calcScore = (clickedElement) => {
        console.log(clickedElement);
    };

    changePlayer = () => {
        this.setState( {
            currentPlayer : this.state.currentPlayer %2 + 1,
            counter: 0,
        })
    };

    changeRollAgain = () => {
        console.log(this.state);
        const newTab = this.state.tab.map(el => {
            if (!this.state.rollAgain && !el.checked) {
                el.number = Math.round(Math.random()*(6-1)+1);
            }
            return el
        });
        this.setState({
            rollAgain: !this.state.rollAgain,
            tab: newTab
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

    increaseCounter = () => {
        const counter = this.state.counter + 1;

        if (counter <= 3 ) {
            this.setState( {
                counter: counter,
            })
        } else {

        }

        // this.setState( {
        //     counter: counter,
        //     currentPlayer: counter %3 === 0 || this.props.scored ? this.state.currentPlayer %2 +1 : this.state.currentPlayer
        // })
    };

    componentDidUpdate() {
        if (this.props.scored) {
            this.setState( {
                counter: 0,
                currentPlayer: this.state.currentPlayer %2 +1
                }
            )
        }
    }

    render() {
        return (
            <div id="board">
                {this.state.tab.map( el => {

                    let diceClass = `cube${el.id}` + (el.checked ? ' checked': '');

                    diceClass = `cube${el.id}`;

                    if (el.checked !== true && this.state.rollAgain === true) {
                        diceClass += ` anim${el.number}` ;
                    } else {
                        diceClass += ` pos${el.number}`
                    }

                    if (this.state.rollAgain === false) {
                        diceClass = `cube${el.id}` + ` pos${el.number}` + (el.checked ? ' checked': '');
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
                <RollButton roll={this.changeRollAgain} counter={this.state.counter} increase={this.increaseCounter} scored={this.props.scored}>Roll the Dice!!!</RollButton>
                <Table scored={this.changeScoredTrue} changePlayer={this.changePlayer} calcScore={this.calcScore} currentPlayer={this.state.currentPlayer}/>
            </div>
        )
    }
}

class RollButton extends Component{

    handleClick = (e) => {

        if (typeof this.props.roll === 'function') {
            this.props.roll();
            setTimeout(() => {
                this.props.roll();

            },6000);
            this.props.increase()
        }
    };

    render() {
        return (
            <button disabled={this.props.counter === 3} className='button' onClick={this.handleClick}>Roll the Dice!!!</button>
        )
    }
}

class Table extends Component {

    click = (e) => {
        // const button = e.target;
        // button.disabled = false;
        // console.log('kliknięte', button);

        // this.props.scored();
        const player = Number(e.target.dataset.player);
        const disabled = Number(e.target.dataset.disabled);

        if (player === this.props.currentPlayer && !disabled) {
            this.props.calcScore(e.target);
            this.props.changePlayer();
            e.target.dataset.disabled = 1;
        }


    };

    render() {
        return (
            <table className="tg">
                <tbody>
                    <tr>
                        <th className="tg-cly1" />
                        <th className="tg-cly2">Player 1</th>
                        <th className="tg-cly2">Player 2</th>
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Aces</td>
                        <td className="tg-1lax" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className="tg-1lax" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Twos</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Threes</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Fours</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Fives</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Sixes</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Total <span className="description">Upper section</span></td>
                        <td className="tg-2lax score" />
                        <td className="tg-2lax score" />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Three of a kind</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Four of a kind</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Full house</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Small straight</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Large straight</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">General</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Chance</td>
                        <td className="tg-1lax" onClick={this.click} />
                        <td className="tg-1lax" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Total <span className="description"> Lower section</span></td>
                        <td className="tg-2lax score" />
                        <td className="tg-2lax score" />
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Grand Total</td>
                        <td className="tg-2lax score" />
                        <td className="tg-2lax score" />
                    </tr>
                </tbody>
            </table>
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

