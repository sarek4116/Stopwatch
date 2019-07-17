
class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running:false,
            minutes:0,
            seconds:0,
            miliseconds:0
        }
    }

    reset() {
        this.setState ({
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        });
    }

    addResult() {
        const results = document.querySelector('.results');
        const newLi = document.createElement('li');
        newLi.innerHTML = this.format(this.times);
        results.appendChild(newLi);
    }

    clearResult() {
        const results = document.querySelector('.results');
        results.innerHTML = '';
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate () {
        let miliseconds = this.state.miliseconds + 1,
            seconds = this.state.seconds,
            minutes = this.state.minutes;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds == 60) {
            minutes += 1;
            seconds = 0;
            miliseconds = 0;
        }
        this.setState({
            minutes,
            seconds,
            miliseconds
        });
    };

    stop() {
        this.setState ({
            running: false
        });
        clearInterval(this.watch);
    }

    render() {
        return (
        <div className={'wrapper'}>

            <nav className={'controls'}>
                <a href="#" onClick={() => {this.start()} }>Start</a>
                <a href="#" onClick={() => {this.stop()} }>Stop</a>
                <a href="#" onClick={() => {this.reset()} }>Restart</a>
                <a href="#" onClick={() => {stopwatch.clearResult()} }>Clear Result</a>
                <a href="#" onClick={() => {this.addResult()} }>Add Result</a>
            </nav>

            <div className={'stopwatch'}>
                {this.format({
                     minutes: this.state.minutes,
                     seconds: this.state.seconds,
                     miliseconds: this.state.miliseconds
                })}
            </div>
            
            <ul className={'results'}>
            </ul>

        </div>

                )
            }
        }

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const app = React.createElement(Stopwatch);
ReactDOM.render(app,document.getElementById('app'))
