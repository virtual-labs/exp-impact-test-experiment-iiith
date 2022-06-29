'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restart);

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', play);

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', pause);

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        FPS = originalFPS * (output.innerHTML);
        restart();
    };


    function restart() {
        window.clearTimeout(tmHandle);
        setAll();
        play();
    }

    function play() {
        if (sliding === 0) {
            tmHandle = window.setTimeout(draw, 1000 / FPS);
        } else {
            tmHandle = window.setTimeout(slide, 10 / FPS);
        }
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    function drawObject(ctx, obj, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }


    const canvas = document.getElementById("main");
    canvas.width = 600;
    canvas.height = 800;
    // canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");

    const lineWidth = 1.5;
    const originalFPS = 10;
    let FPS = 10;
    let tmHandle;

    const standX = 0;
    const standY = 520;
    const standWidth = 600;
    const standHeight = 80;

    const boxX = 200;
    const boxWidth = 200;
    const boxY = 420;
    const boxHeight = 100;

    const firstSlabX = 280;
    const firstSlabWidth = 40;
    const firstSlabY = 420;
    const firstSlabHeight = 40;

    const secondSlabX = 280;
    const secondSlabWidth = 40;
    const secondSlabY = 380;
    const secondSlabHeight = 40;

    let box = [];
    let stand = [];
    let firstSlab = [];
    let secondSlab = [];


    function setAll() {
        box = [
            [boxX, boxY],
            [boxX + boxWidth, boxY],
            [boxX + boxWidth, boxY + boxHeight],
            [boxX, boxY + boxHeight]
        ];

        stand = [
            [standX, standY],
            [standX + standWidth, standY],
            [standX + standWidth, standY + standHeight],
            [standX, standY + standHeight]
        ];

        firstSlab = [
            [firstSlabX, firstSlabY],
            [firstSlabX + firstSlabWidth, firstSlabY],
            [firstSlabX + firstSlabWidth, firstSlabY + firstSlabHeight],
            [firstSlabX, firstSlabY + firstSlabHeight]
        ];

        secondSlab = [
            [secondSlabX, secondSlabY],
            [secondSlabX + secondSlabWidth, secondSlabY],
            [secondSlabX + secondSlabWidth, secondSlabY + secondSlabHeight],
            [secondSlabX, secondSlabY + secondSlabHeight]
        ];
        firstAngle = 0;
        secondAngle = 0;
        freefall = 1;
        sliding = 0;
    }

    const centerX = canvas.width / 2;
    const centerY = 200;
    const stringLength = 150;
    const firstWidth = 20;
    const secondWidth = 40;
    const height = 50;

    const angle1 = Math.atan(firstWidth / stringLength);
    const angle2 = Math.atan(secondWidth / (height + stringLength));

    const firstRadius = Math.sqrt(firstWidth * firstWidth + stringLength * stringLength);
    const secondRadius = Math.sqrt(secondWidth * secondWidth + (stringLength + height) ** 2);
    let firstAngle;
    let secondAngle;
    let freefall;
    let sliding;
    setAll();
    drawStatic();

    function drawCircle(ctx, x, y, radius, freefall) {
        ctx.beginPath();
        ctx.fillStyle = data.colors.black;
        ctx.strokeStyle = data.colors.black;
        ctx.lineWidth = 6;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (freefall === 0) {
            ctx.fill();
        }
        ctx.restore();
    }

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        drawObject(ctx, stand, data.colors.stand);
        drawObject(ctx, box, data.colors.box);
        drawObject(ctx, firstSlab, data.colors.black);
        drawObject(ctx, secondSlab, data.colors.black);
        drawCircle(ctx, centerX, centerY, 10, 1);
        ctx.moveTo(centerX, centerY);
        let boxex = centerX + stringLength * Math.cos(firstAngle);
        let boxey = centerY + stringLength * Math.sin(firstAngle);
        ctx.lineWidth = 7;
        ctx.lineTo(boxex, boxey);
        ctx.stroke();
        ctx.lineWidth = 1;


        drawBox(centerX, centerY, firstAngle);

        ctx.font = "30px Arial";
        ctx.fillText("Izod Impact Tester", 200, 50);
    }

    function drawBox(x, y, firstAngle) {
        let newBox = [
            [x + firstRadius * Math.cos(firstAngle - angle1), y + firstRadius * Math.sin(firstAngle - angle1)],
            [x + firstRadius * Math.cos(firstAngle + angle1), y + firstRadius * Math.sin(firstAngle + angle1)],
            [x + secondRadius * Math.cos(firstAngle + angle2), y + secondRadius * Math.sin(firstAngle + angle2)],
            [x + secondRadius * Math.cos(firstAngle - angle2), y + secondRadius * Math.sin(firstAngle - angle2)],
        ];
        drawObject(ctx, newBox, data.colors.newbox);
    }

    function draw() {
        drawStatic();
        firstAngle += 0.01;
        if (firstAngle <= Math.PI / 2) {
            tmHandle = window.setTimeout(draw, 100 / FPS);
        }

        if (firstAngle + angle2 > Math.PI / 2 && sliding === 0) {
            sliding = 1;
            tmHandle = window.setTimeout(slide, 1000 / FPS);
        }
    }


    function slide() {
        drawStatic();
        if (secondSlab[2][0] >= boxX && freefall) {
            secondSlab[0][0]--;
            secondSlab[1][0]--;
            secondSlab[2][0]--;
            secondSlab[3][0]--;
            tmHandle = window.setTimeout(slide, 50 / FPS);
        } else if (secondSlab[2][1] <= boxY + boxHeight) {
            freefall = 0;
            secondAngle += 0.01;
            secondSlab[2][0] = boxX - boxHeight * Math.sin(secondAngle);
            secondSlab[2][1] = boxY + boxHeight - boxHeight * Math.cos(secondAngle);

            secondSlab[3][0] = secondSlab[2][0] - secondSlabWidth;
            secondSlab[3][1] = secondSlab[2][1];

            secondSlab[1][0] = secondSlab[2][0];
            secondSlab[1][1] = secondSlab[2][1] - secondSlabHeight;

            secondSlab[0][1] = secondSlab[1][1];
            secondSlab[0][0] = secondSlab[3][0];

            tmHandle = window.setTimeout(slide, 50 / FPS);
        } else {
            pauseButton.setAttribute("disabled", "true");
        }
    }

});