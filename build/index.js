class PomodoroTimer extends React.Component {

    constructor() {
        super();
        self = this;
        this.state = { timeLeft: 'Select a time and press start! When time expires, take 5!',
            timeElapsed: 0, workInterval: 25, isClockRunning: false };
    }

    changeTimerLength(e) {
        self.setState({ workInterval: e.target.value });
    }

    startTimer() {
        if (self.state.isClockRunning === false) {
            var workIntervalSeconds = self.state.workInterval * 60;
            self.interval = setInterval(self.elapsedTime.bind(self), 1000);
            self.setState({ isClockRunning: true });
            self.setState({ timeLeft: self.composeTime(workIntervalSeconds) });
            self.setState({ start: new Date() });
            self.setState({ workIntervalSeconds: workIntervalSeconds });
        }
    }

    resetTimer() {
        if (self.state.isClockRunning === true) {
            clearInterval(self.interval);
            self.setState({ isClockRunning: false });
            self.setState({ timeLeft: self.props.instructionalGreeting });
        }
    }

    composeTime(timeInSeconds) {
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - minutes * 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var minutesSeconds = minutes + ":" + seconds;

        return minutesSeconds;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.setState({ timeLeft: this.props.instructionalGreeting });
    }

    elapsedTime() {
        var timeElapsed = Math.floor((new Date() - this.state.start) / 1000);
        this.setState({ timeElapsed: timeElapsed });

        var timeLeft = this.state.workIntervalSeconds - timeElapsed;

        var minutesSeconds = this.composeTime(timeLeft);

        this.setState({ timeLeft: minutesSeconds });

        if (this.state.timeElapsed >= this.state.workIntervalSeconds) {
            clearInterval(this.interval);
            alert('Time to rest!');
            this.setState({ timeLeft: this.props.instructionalGreeting });
            this.setState({ isClockRunning: false });
        };
    }

    render() {
        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "row first-row" },
                React.createElement(
                    "div",
                    { className: "col-xs-8 col-sm-6 col-md-4 col-centered" },
                    React.createElement(
                        "div",
                        { className: "panel panel-primary pomodoro-panel" },
                        React.createElement(
                            "div",
                            { className: "panel-heading" },
                            React.createElement(
                                "h3",
                                { className: "panel-title" },
                                "Welcome to your Pomodoro Timer!"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.isClockRunning ? "clock panel-body" : "clock-text panel-body" },
                            this.state.timeLeft
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-3 col-med-2 col-centered" },
                    React.createElement(
                        "div",
                        { className: "container fill-columns" },
                        React.createElement(
                            "select",
                            { className: "select-timer-dropdown", defaultValue: this.state.workInterval, onChange: this.changeTimerLength },
                            React.createElement(
                                "option",
                                { value: "0.05" },
                                "test"
                            ),
                            React.createElement(
                                "option",
                                { value: "15" },
                                "15 minutes"
                            ),
                            React.createElement(
                                "option",
                                { value: "20" },
                                "20 minutes"
                            ),
                            React.createElement(
                                "option",
                                { value: "25" },
                                "25 minutes"
                            ),
                            React.createElement(
                                "option",
                                { value: "30" },
                                "30 minutes"
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "container col-xs-8 col-sm-6 col-md-4 col-centered" },
                    React.createElement(
                        "div",
                        { className: "pull-left" },
                        React.createElement(
                            "button",
                            {
                                onClick: this.startTimer,
                                className: "btn btn-success main-button" },
                            "Start"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "pull-right" },
                        React.createElement(
                            "button",
                            {
                                onClick: this.resetTimer,
                                className: "btn btn-danger main-button" },
                            "Reset"
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(PomodoroTimer, { instructionalGreeting: 'Select a time and press start! When time expires, take 5!' }), document.getElementById('app'));