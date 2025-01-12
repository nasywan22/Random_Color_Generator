// SYSTEM BLUEPRINT
class System {
    text = document.getElementById('HEX-label');

    randomString() {
        const character = "abcdefABCDEF1234567890";
        let randHEX = "#";

        for (let index = 0; index < 6; index++) {
            randHEX += character[Math.floor(Math.random() * character.length)];
        }
        return randHEX;
    }

    copy() {
        if (typeof document !== 'undefined') {
            let copy_btn = document.getElementById("copy-btn");

            copy_btn.addEventListener('click', () => {
                navigator.clipboard.writeText(this.text.textContent).then(() => {
                    console.log("Copied!");
                    copy_btn.textContent = "Copied!";
                    animation.notification();
                    setTimeout(() => {
                        copy_btn.textContent = "Copy HEX";
                    }, 3000);
                }).catch(err => {
                    this.text.textContent = "Failed to copy: " + err;
                    console.log("Failed to copy: " + err);
                })
            })

        } else {
            console.log("Document tidak tersedia");
        }
    }
}

// ANIMATION BLUEPRINT
class Animate {
    putar = document.getElementById('putar');
    angleForward = 360;
    angleBackward = 0;

    rotation() {
        this.angleForward += 360;
        this.putar.style.transform = `rotate(${this.angleForward}deg)`;
    }

    async typing(txt) {
        let txtLabel = txt;

        for (let index = 0; index < txt.length; index++) {
            await sleep(25);
            notifyText.textContent += txt[index];        
        }

        await sleep(2000);
        for (let index = txt.length; index > 0; index--) {
            await sleep(25);
            txtLabel = txtLabel.slice(0, index - 1);
            notifyText.textContent = txtLabel;
        }
    }

    async notification() {
        this.angleBackward -= 360
        const notif = document.getElementById("copied-notify");
        notif.style.transform = 'translate(0, -100%)';

        await sleep(550);
        document.getElementById('check-icon').style.transform = `rotate(${this.angleBackward}deg)`;
        document.getElementById('check-icon').style.color = 'lime';
        notif.style.width = '10vw';
        this.typing('HEX Copied!');

        await sleep(2380);
        notif.style.width = '2.4vw';

        await sleep(800);
        notif.style.transform = 'translate(0, -350%)';
    }
}

class EventListener {
    reload = document.getElementById('reload-btn');

    spaceEvent() {
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                animation.rotation();

                let randHEX = system.randomString();
                system.text.textContent = randHEX;

                document.querySelector("body").style.backgroundColor = randHEX;
            }
        });
    }

    reloadBtn() {
        this.reload.addEventListener('click', () => {
            animation.rotation();

            let randHEX = system.randomString();
            system.text.textContent = randHEX;

            document.querySelector("body").style.backgroundColor = randHEX;
        })
    }
}

// FUNCTION SLEEP / DELAY
const sleep = ms => new Promise(r => setTimeout(r, ms));

// MAIN
const notifyText = document.getElementById("notify-txt");
const system = new System();
const animation = new Animate();
const keyListener = new EventListener();

// =========================EVENT LISTENER============================== //
system.copy();
keyListener.spaceEvent();
keyListener.reloadBtn();
// =================================================================== //

// FOOTER
let randHEX = system.randomString();
system.text.textContent = randHEX;
document.querySelector("body").style.backgroundColor = randHEX;