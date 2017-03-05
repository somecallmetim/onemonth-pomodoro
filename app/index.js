class PomodoroTimer extends React.Component{

    constructor(){
        super();
        self = this;
        this.state = {timeLeft: 'Select a time and press start! When time expires, take 5!',
            timeElapsed: 0, workInterval: 25, isClockRunning: false};
    }

    changeTimerLength(e){
        self.setState({workInterval: e.target.value});
    }

    startTimer(){
        if(self.state.isClockRunning === false){
            var workIntervalSeconds = self.state.workInterval*60;
            self.interval = setInterval(self.elapsedTime.bind(self),1000);
            self.setState({isClockRunning: true});
            self.setState({timeLeft: self.composeTime(workIntervalSeconds)});
            self.setState({start: new Date()});
            self.setState({workIntervalSeconds: workIntervalSeconds})
        }
    }

    resetTimer(){
        if(self.state.isClockRunning === true){
            clearInterval(self.interval);
            self.setState({isClockRunning: false});
            self.setState({timeLeft: self.props.instructionalGreeting});
        }
    }

    composeTime(timeInSeconds){
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - minutes * 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        var minutesSeconds = minutes + ":" + seconds;

        return minutesSeconds;
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.setState({timeLeft: this.props.instructionalGreeting});
    }

    elapsedTime(){
        var timeElapsed = Math.floor((new Date() - this.state.start)/1000);
        this.setState({timeElapsed: timeElapsed});

        var timeLeft = this.state.workIntervalSeconds - timeElapsed;

        var minutesSeconds = this.composeTime(timeLeft);

        this.setState({timeLeft: minutesSeconds});

        if(this.state.timeElapsed >= (this.state.workIntervalSeconds)){
            clearInterval(this.interval);
            alert('Time to rest!');
            this.setState({timeLeft: this.props.instructionalGreeting});
            this.setState({isClockRunning: false});
        };
    }

    render(){
        return (

            <div className="container">

                <div className="row first-row">
                    <div className="col-xs-8 col-sm-6 col-md-4 col-centered">
                        <div className="panel panel-primary pomodoro-panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Welcome to your Pomodoro Timer!
                                </h3>
                            </div>
                            <div className={this.state.isClockRunning ? "clock panel-body" : "clock-text panel-body"}>
                                {this.state.timeLeft}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-4 col-sm-3 col-med-2 col-centered">
                        <div className="container fill-columns">
                            <select className="select-timer-dropdown" defaultValue={this.state.workInterval} onChange={this.changeTimerLength}>
                                <option value='0.05'>test</option>
                                <option value='15'>15 minutes</option>
                                <option value='20'>20 minutes</option>
                                <option value='25'>25 minutes</option>
                                <option value='30'>30 minutes</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="container col-xs-8 col-sm-6 col-md-4 col-centered">
                        <div className="pull-left">
                            <button
                                onClick={this.startTimer}
                                className="btn btn-success main-button">Start</button>
                        </div>
                        <div className="pull-right">
                            <button
                                onClick={this.resetTimer}
                                className="btn btn-danger main-button">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

ReactDOM.render(
    <PomodoroTimer instructionalGreeting={'Select a time and press start! When time expires, take 5!'} />,
    document.getElementById('app')
);