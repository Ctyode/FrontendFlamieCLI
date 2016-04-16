var terminal = function(boxID) {

    const commands = ['clear', 'help', 'screenfetch'];

    var box = document.getElementById(boxID);
    box.insertAdjacentHTML('beforeEnd', ['<output></output>', '<div id="input-line" class="input-line">',
                                         '<div class="cursor">Flamies-MacBook-Pro:~ flamie$</div><div>' +
                                         '<input class="command-line" autofocus /></div>', '</div>'].join(''));
    var inputLine = box.querySelector('#input-line .command-line');
    var output = box.querySelector('output');

    inputLine.addEventListener('keyup', historyFunction, false);
    inputLine.addEventListener('keydown', addCommand, false);

    var history = [];
    var historyPosition = 0;

    function addCommand(e) {
        if(e.keyCode == 13) {
            if (this.value) {
                history[history.length] = this.value;
                historyPosition = history.length;
            }

            var line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id');
            line.classList.add('line');
            output.appendChild(line);

            if (this.value && this.value.trim()) {
                var args = this.value.split(' ').filter(function(val) {
                    return val;
                });
                var cmd = args[0].toLowerCase();
                args = args.splice(1);
            }

            switch (cmd) {
                case 'help':
                    outputFunction('<div class="help">' + commands.join('<br>') + '</div>');
                    break;
                case 'clear':
                    clear(this);
                    return;
                case 'screenfetch':
                    outputFunction('blablabla');
                    break;
                default:
                    if (cmd) {
                        outputFunction(cmd + ': command not found');
                    }
            }
            this.value = '';
        }
    }

    function outputFunction(html) {
        output.insertAdjacentHTML('beforeEnd', html);
        inputLine.scrollIntoView();
    }

    function historyFunction(e) {
        if(history.length) {
            if(e.keyCode == 38 || e.keyCode == 40) {
                if(history[historyPosition]) {
                    history[historyPosition] = this.value;
                }
            }

            if(e.keyCode == 38) {
                historyPosition--;
                if(historyPosition < 0) {
                    historyPosition = 0;
                }
            } else if (e.keyCode == 40) {
                historyPosition++;
                if (historyPosition > history.length) {
                    historyPosition = history.length;
                }
            }

            if (e.keyCode == 38 || e.keyCode == 40) {
                if(this.value = history[historyPosition]) {
                    this.value = history[historyPosition];
                } else {
                    this.value = null;
                }
                this.value = value;
            }
        }
    }

    function clear(input) {
        output.innerHTML = '';
        input.value = '';
    }
};

