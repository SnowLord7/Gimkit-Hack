(() => {
    /*

        Gimkit hack by Drew Snow

        Created: Fri Aug 23 2019 14:57:53 GMT-0700 (Pacific Daylight Time)
        Updated: Thu Mar 19 2020 08:15:08 GMT-0700 (Pacific Daylight Time)

    */

    let Exploit = function () {
        this.terms = {};
        this.game = {};

        this.interval = -1;
        this.shop = {
            'MPQ': [10, 100, 1e3, 1e4, 75e3, 3e5, 1e6, 1e7, 1e8],
            'SB': [15, 150, 1500, 15e3, 115e3, 45e4, 15e5, 15e6, 2e8],
            'Multi': [50, 300, 2e3, 12e3, 85e3, 7e5, 65e5, 65e6, 1e9],
            'Powerups': [
                {
                    'name': 'Love Song',
                    'price': 55
                }, {
                    'name': 'Clapinator',
                    'price': 25
                }, {
                    'name': 'Icer',
                    'price': 45
                }, {
                    'name': 'Deflector',
                    'price': 60
                }, {
                    'name': 'Rebooter',
                    'price': 1005
                }, {
                    'name': 'Gift',
                    'price': 205
                }, {
                    'name': 'Subtractor',
                    'price': 155
                }, {
                    'name': 'Reducer',
                    'price': 135
                }, {
                    'name': 'Discounter',
                    'price': 255
                }, {
                    'name': 'Mini Bonus',
                    'price': 25
                }, {
                    'name': 'Mega Bonus',
                    'price': 55
                },
            ]
        };

        /*this.elem = document.createElement('div');
        this.elem.style = `position: fixed; z-index: 2147483638; top: 60px; right: 0; border: 5px 0 0 5px;`;
        this.elem.innerHTML = `
            <div>Money Per Question: <span name="inp_mpq">$10</span></div>
            <div>Streak Bonus: <span name="inp_sb">$15</span></div>
            <div>Multiplier: <span name="inp_mp">$50</span></div>
        `;
        document.body.appendChild(this.elem);*/

        this.fetch = this.clean('fetch');

        this.initiate();
    }

    Exploit.prototype.clean = function (key) {
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        let window = iframe.contentWindow;
        iframe.parentNode.removeChild(iframe);
        return window[key];
    };

    Exploit.prototype.closest_number = function (number = 0, array = []) {
        let arr = array.map(function (k) { return Math.abs(k - number) }),
            min = Math.min.apply(Math, arr);

        return array[arr.indexOf(min)];
    };

    Exploit.prototype.update_shop = function () {
        let upgrades = this.shop,
            money = this.money();

        document.querySelector('*[name="inp_mpq"]').textContent = '$' + this.closest_number(money, upgrades.MPQ);
        document.querySelector('*[name="inp_sb"]').textContent = '$' + this.closest_number(money, upgrades.SB);
        document.querySelector('*[name="inp_mp"]').textContent = '$' + this.closest_number(money, upgrades.Multi);
    };

    Exploit.prototype.money = function () {
        let root = document.getElementById('root'),
            money = root.children[0].children[0].textContent;

        return Number(money.replace(/[^0-9.-]+/g, ''))
    };

    Exploit.prototype.style_text = function (elem) {
        elem.style.borderRadius = '5px';
        elem.style.borderBottom = '5px solid red';
    };

    Exploit.prototype.style_img = function (elem) {
        elem.style.borderRadius = '5px';
        elem.style.borderBottom = '5px solid red';
    };

    Exploit.prototype.loop = function () {
        if (document.getElementsByClassName('animated tada').length || document.getElementsByClassName('animated jello').length) return false;

        let question = this.header().textContent,
            answers = this.terms.filter(e => e.text == question),
            answer = answers[Math.floor(Math.random() * answers.length)];

        if (!answer) return false;
        let type = answer.type

        answer = answer.answers.filter(e => e.correct)[0]

        if (type == 'mc') {
            if (answer.image) {
                let element = document.querySelector(`img[src="${answer.image}"]`);
                if (element) this.style_img(element);
            } else if (answer.text) {
                let elements = Array.from(document.querySelectorAll('span')).filter(e => e.textContent == answer.text),
                    element = elements[Math.floor(Math.random() * elements.length)];

                this.style_text(element);
            }
        } else if (type == 'text') {
            let input = this.input();
            if (input) {
                input.value = answer.text;
                input.placeholder = answer.text;
            }
        }
    };

    Exploit.prototype.initiate = function () {
        let questions = this.questions();
        if (questions.length < 1) return setTimeout(() => { this.initiate(); }, 1000);

        this.fetch_terms(questions[0].game, terms => {
            this.interval = setInterval(() => { this.loop(); }, 100);
        });
    };

    Exploit.prototype.fetch_terms = function (gameId = '', callback = console.log) {
        let req = new XMLHttpRequest();
        req.open('GET', 'https://www.gimkit.com/api/games/fetch/' + gameId);
        req.onreadystatechange = () => { 
            if (req.readyState == 4 && req.status == 200) {
                let json = JSON.parse(req.responseText);

                this.game = json;
                this.terms = json.kit.questions;

                if (callback) callback(json.kit.questions);
            }
        }
        req.send();
    };

    Exploit.prototype.questions = function () {
        let questions = JSON[Object.keys(JSON)[0]];
        return questions || [];
    }

    Exploit.prototype.header = function () {
        let root = document.getElementById('root');

        return root.children[0].children[1].children[0].children[0].children[0];
    };

    Exploit.prototype.options = function () {
        return Array.from(document.getElementById('root').children[0].children[1].children[0].children[0].children[1].children);
    };

    Exploit.prototype.input = function () {
        return document.querySelector('input');
    };

    alert('GIMKIT SCRIPT V0.02\n- Drew Snow\n\nThis script is "under development" as people are still complaining about being kicked.\n\nInstructions:\n‣ For text questions press any key inside the text box then click answer.\n‣ For multiple choice the correct answer should be underlined in red.\n\nThis script is still in beta, send me a message on discord if anything is not working correctly.');
    let Session = new Exploit();

    return 'Script has been loaded.';
})();
