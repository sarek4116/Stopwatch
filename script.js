
class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running:false,
            minutes:0,
            seconds:0,
            miliseconds:0,
            time: []
        }
    }

    reset = () => {
        this.setState ({
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
        });
    }

    addResult = () => {
        const timeAdd = this.format();
            this.setState({time: [...this.state.time,timeAdd] });
            console.log(this.state.time)
    }

    clearResult = () => {
        this.setState({ time: [] })
    }

    format = () => {
        function pad0(value) {
            let result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }        
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }

    start = () => {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate = () => {
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

    stop = () => {
        this.setState ({
            running: false
        });
        clearInterval(this.watch);
    }

    render() {

        const timeResults = this.state.time.map(item => {
            return <li key={item}>{item}</li>;
          });
        

        return (
        <div className={'wrapper'}>

            <nav className={'controls'}>
                <a href="#" onClick={() => {this.start()} }>Start</a>
                <a href="#" onClick={() => {this.stop()} }>Stop</a>
                <a href="#" onClick={() => {this.reset()} }>Restart</a>
                <a href="#" onClick={() => {this.clearResult()} }>Clear Result</a>
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
                    {timeResults}
            </ul>

        </div>

                )
            }
        }


const app = React.createElement(Stopwatch);
ReactDOM.render(app,document.getElementById('app'))
