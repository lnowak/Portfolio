import React, {Component} from "react";
import ReactDOM from 'react-dom';

import './../sass/style.scss';

// const tab = [
//     {id: 1, checked: false, number: 2},
//     {id: 2, checked: false, number: 5},
//     {id: 3, checked: false, number: 4},
//     {id: 4, checked: false, number: 3},
//     {id: 5, checked: false, number: 2}
// ];

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
        scored: false,
        totalScore1: 0,
        totalScore2: 0,
        upperScore1: 0,
        upperScore2: 0,
        lowerScore1: 0,
        lowerScore2: 2
    };

    changeSelected = () => {
        this.setState( {
            selected: 1,
        })
    };

    changePlayer = () => {
        const newTab = this.props.tab.map((el) => {
            el.checked = false;
            el.number = Math.round(Math.random()*(6-1)+1);
            return el;

        });

        this.setState( {
            currentPlayer : this.state.currentPlayer %2 + 1,
            counter: 1,
            tab: newTab,
        })
    };

    changeRollAgain = () => {
        console.log(this.state);
        const newTab = this.state.tab.map(el => {
            if (!this.state.rollAgain && !el.checked) {
                el.number = Math.round(Math.random()*(6-1)+1);
                // el.number = 2
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

    scoreUpdate = () => {
        const fields = document.querySelectorAll(`td[data-player = "${this.state.currentPlayer}"] `);
        // console.log(fields);
        let sum = 0;
        fields.forEach(f => {
            sum += Number(f.innerText);
        });
        this.setState( {
            [`totalScore${this.state.currentPlayer}`]: sum,
        })
    };

    upperScoreUpdate = () => {
        const fields = document.querySelectorAll(`td[data-score = "${this.state.currentPlayer}"] `);
        // console.log(fields);
        let sum = 0;

        fields.forEach(f => {
            sum += Number(f.innerText);
        });
        this.setState( {
            [`upperScore${this.state.currentPlayer}`]: sum,
        })
    };

    lowerScoreUpdate = () => {
        const fields = document.querySelectorAll(`td[data-score2 = "${this.state.currentPlayer}"] `);
        // console.log(fields);
        let sum = 0;

        fields.forEach(f => {
            sum += Number(f.innerText);
        });
        this.setState( {
            [`lowerScore${this.state.currentPlayer}`]: sum,
        })
    };

    componentDidUpdate() {
        if (this.props.scored) {
            this.setState( {
                counter: 0,
                currentPlayer: this.state.currentPlayer %2 +1,
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
                <Table lowerScoreUpdate={this.lowerScoreUpdate} lowerScore2={this.state.lowerScore2} lowerScore1={this.state.lowerScore1} upperScoreUpdate={this.upperScoreUpdate} upperScore2={this.state.upperScore2} upperScore1={this.state.upperScore1} totalScore1={this.state.totalScore1} totalScore2={this.state.totalScore2} scoreUpdate={this.scoreUpdate} tab={this.state.tab} scored={this.changeScoredTrue} changePlayer={this.changePlayer} calcScore={this.calcScore} currentPlayer={this.state.currentPlayer}/>
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

            },600);
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

        const player = Number(e.target.dataset.player);
        const disabled = Number(e.target.dataset.disabled);

        if (player === this.props.currentPlayer && !disabled) {
            e.target.dataset.disabled = 1;
            e.target.className = "tg-1lax selected";
            const fnName = e.target.dataset.fn;
            this[fnName](e.target);
            this.props.scoreUpdate();
            this.props.upperScoreUpdate();
            this.props.lowerScoreUpdate();
            this.props.changePlayer();
        }


    };



    aces = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 1) {
                fnScore += 1;
            }
        });

        element.innerText = fnScore;
    };

    twos = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 2) {
                fnScore += 2;
            }
        });

        element.innerText = fnScore;
    };

    threes = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 3) {
                fnScore += 3;
            }
        });

        element.innerText = fnScore;
    };

    fours = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 4) {
                fnScore += 4;
            }
        });

        element.innerText = fnScore;
    };

    fives = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 5) {
                fnScore += 5;
            }
        });

        element.innerText = fnScore;
    };

    sixes = (element) => {

        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (part.number === 6) {
                fnScore += 6;
            }
        });

        element.innerText = fnScore;
    };

    // upperTotal = (element) => {
    //
    //     let fnNameScore = 0;
    //     // this.props.tab.map( (part) => {
    //     //     console.log(part.number);
    //     //
    //     //     if (part.number === 6) {
    //     //         fnScore += 6;
    //     //     }
    //     // });
    //
    //     element.innerText = fnNameScore;
    // };

    totk = (element) => {
        const numbers = this.getRolledNumbers();
        const isFull = this.getCountRolledNumbers(numbers, 3) || this.getCountRolledNumbers(numbers, 4) || this.getCountRolledNumbers(numbers, 5);
        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (isFull) {
                fnScore += part.number;
            }
        });
        element.innerText = fnScore;
    };

    fotk = (element) => {
        const numbers = this.getRolledNumbers();
        const isFull = this.getCountRolledNumbers(numbers, 4) || this.getCountRolledNumbers(numbers, 5);
        let fnScore = 0;
        this.props.tab.map( (part) => {
            if (isFull) {
                fnScore += part.number;
            }
        });
        element.innerText = fnScore;
    };

    getRolledNumbers = () => {
        const numbers = [1,2,3,4,5,6].map( number => {
            let counter = 0;
            this.props.tab.forEach(cube => {
                if (cube.number === number) {
                    counter++;
                }
            });
            return counter
        });
        return numbers
    };

    getCountRolledNumbers = ( numbers, count ) => {
        return numbers.indexOf(count) > -1;
    };

    full = (element) => {
        const numbers = this.getRolledNumbers();
        console.log(numbers);
        const isFull = this.getCountRolledNumbers(numbers, 3) && this.getCountRolledNumbers(numbers, 2);
        let fnScore = 0;
        if (isFull) {
            fnScore = 25;
        }
        element.innerText = fnScore;
    };

    smalls = (element) => {
        const numbers = Array.from(new Set(this.props.tab.map(cube => cube.number)));

        numbers.sort((a,b) => a-b);
        console.log(numbers);
        let count = 0;
        numbers.reduce((prev, curr) => {
            if (prev + 1=== curr ) {
                console.log(prev+1, curr);
                count++;
            } else {
                count = 0;
                console.log(prev+1, curr);
            }
            return curr
        }, 0);

        const isFull = count >= 3;

        console.log(count, numbers, numbers.length, isFull);
        let fnScore = 0;
        if (isFull) {
            fnScore = 30;
        }
        element.innerText = fnScore;
    };

    larges = (element) => {
        const numbers = Array.from(new Set(this.props.tab.map(cube => cube.number)));

        numbers.sort((a,b) => a-b);
        console.log(numbers);
        let count = 0;
        numbers.reduce((prev, curr) => {
            if (prev + 1=== curr ) {
                console.log(prev+1, curr);
                count++;
            } else {
                count = 0;
                console.log(prev+1, curr);
            }
            return curr
        }, 0);

        const isFull = count >= 4;

        console.log(count, numbers, numbers.length, isFull);
        let fnScore = 0;
        if (isFull) {
            fnScore = 40;
        }
        element.innerText = fnScore;
    };

    general = (element) => {

        let fnScore = 0;
        const firstNumber = this.props.tab[0].number;
        const isGeneral = this.props.tab.every(item => item.number === firstNumber);
        if (isGeneral) {
            fnScore = 50;
        }

        element.innerText = fnScore;
    };

    chance = (element) => {
        let fnScore = 0;
        this.props.tab.map( (part) => {
            console.log(part.number);
            fnScore += part.number
        });

        element.innerText = fnScore;
    };

    // componentDidUpdate() {
    //     let score = 0;
    //     if (this.props.scored) {
    //         score += this.fnScore;
    //         console.log(score);
    //     }
    // }

    render() {

        const mainTabClass = "tg-1lax";

        let score = 0;
        if (this.props.scored) {
            score += fnScore;
                console.log(fnScore);
        }

        return (
            <table className="tg">
                <tbody>
                    <tr>
                        <th className="tg-cly1" />
                        <th className={'tg-cly2' + (this.props.currentPlayer === 1 ? ' active' : '')}>Player 1</th>
                        <th className={'tg-cly2' + (this.props.currentPlayer === 2 ? ' active' : '')}>Player 2</th>
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Aces</td>
                        <td className={mainTabClass} data-fn="aces" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="aces" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Twos</td>
                        <td className={mainTabClass} data-fn="twos" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="twos" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Threes</td>
                        <td className={mainTabClass} data-fn="threes" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="threes" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Fours</td>
                        <td className={mainTabClass} data-fn="fours" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="fours" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Fives</td>
                        <td className={mainTabClass} data-fn="fives" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="fives" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Sixes</td>
                        <td className={mainTabClass} data-fn="sixes" data-score="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="sixes" data-score="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Total <span className="description">Upper section</span></td>
                        <td className="tg-2lax score center" data-fn="upperTotal"> {this.props.upperScore1} </td>
                        <td className="tg-2lax score center" data-fn="upperTotal"> {this.props.upperScore2} </td>
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Three of a kind</td>
                        <td className={mainTabClass} data-fn="totk" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="totk" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Four of a kind</td>
                        <td className={mainTabClass} data-fn="fotk" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="fotk" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Full house</td>
                        <td className={mainTabClass} data-fn="full" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="full" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Small straight</td>
                        <td className={mainTabClass} data-fn="smalls" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="smalls" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Large straight</td>
                        <td className={mainTabClass} data-fn="larges" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="larges" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">General</td>
                        <td className={mainTabClass} data-fn="general" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="general" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-0lax padd2l">Chance</td>
                        <td className={mainTabClass} data-fn="chance" data-score2="1" data-player="1" data-disabled={0} onClick={this.click} />
                        <td className={mainTabClass} data-fn="chance" data-score2="2" data-player="2" onClick={this.click} />
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Total <span className="description"> Lower section</span></td>
                        <td className="tg-2lax score center"> {this.props.lowerScore1} </td>
                        <td className="tg-2lax score center"> {this.props.lowerScore2} </td>
                    </tr>
                    <tr>
                        <td className="tg-2lax score padd2l">Grand Total</td>
                        <td className="tg-2lax score center"> {this.props.totalScore1} </td>
                        <td className="tg-2lax score center"> {this.props.totalScore2} </td>
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

