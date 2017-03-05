class PomodoroTimer extends React.Component {

    constructor() {
        super();
        self = this;
        this.state = { timeLeft: '--:--', timeElapsed: 0 };
    }

    totalTime(workInterval, restInterval) {
        return workInterval + restInterval;
    }

    // componentDidMount(){
    //     this.interval = setInterval(this.elapsedTime.bind(this),1000);
    //     this.setState({start: new Date()});
    // }

    startTimer() {
        self.interval = setInterval(self.elapsedTime.bind(self), 1000);
        self.setState({ start: new Date() });
    }

    resetTimer() {
        clearInterval(self.interval);
        self.setState({ timeLeft: '--:--' });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.setState({ timeLeft: '--:--' });
    }

    elapsedTime() {
        var currentTime = new Date();
        var timeElapsed = Math.floor((new Date() - this.state.start) / 1000);
        this.setState({ timeElapsed: timeElapsed });

        var workIntervalSeconds = this.props.workInterval * 60;
        var timeLeft = workIntervalSeconds - timeElapsed;

        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft - minutes * 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var minutesSeconds = minutes + ":" + seconds;

        this.setState({ timeLeft: minutesSeconds });

        if (this.state.timeElapsed >= this.props.workInterval * 60) {
            clearInterval(this.interval);
            alert('Time to rest!');
            this.setState({ timeLeft: '--:--' });
        };
    }

    render() {
        return (
            // <div>
            //     This timer funs for {this.props.workInterval} minutes, followed by a rest
            //     of {this.props.restInterval} minutes, <br/>for a total time
            //     of {this.totalTime(this.props.workInterval, this.props.restInterval)} minutes.
            //     <br/>There are {this.state.timeElapsed} seconds elapsed.
            // </div>

            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row first-row' },
                    React.createElement(
                        'div',
                        { className: 'col-xs-8 col-sm-6 col-md-4 col-centered' },
                        React.createElement(
                            'div',
                            { className: 'panel panel-primary' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    'h3',
                                    { className: 'panel-title' },
                                    'Welcome to your Pomodoro Timer!'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body clock' },
                                this.state.timeLeft
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'container col-xs-8 col-sm-6 col-md-4 col-centered' },
                        React.createElement(
                            'div',
                            { className: 'pull-left' },
                            React.createElement(
                                'button',
                                {
                                    onClick: this.startTimer,
                                    className: 'btn btn-success main-button' },
                                'Start'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'pull-right' },
                            React.createElement(
                                'button',
                                {
                                    onClick: this.resetTimer,
                                    className: 'btn btn-danger main-button' },
                                'Reset'
                            )
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(PomodoroTimer, { workInterval: 25, restInterval: 5, timeElapsed: 'xx' }), document.getElementById('app'));