/**
 * @typedef {{
 *      color: string;
 *      offset: number;
 * }} ColourStop
 */

/**
 * @typedef {{
 *      xCentre: number;
 *      yCentre: number;
 *      radius: number;
 *      strokeColor?: string;
 *      strokeWidth?: number;
 *      fillColor?: string|FillColorCallback;
 * }} ShapeOptions
 */

class Shape {
    /**
     * @callback FillColorCallback
     * @param {Shape} shape
     */

    /** @param {ShapeOptions} options */
    constructor(options) {
        const defaults = {
            xCentre: 0,
            yCentre: 0,
            radius: 0,
            strokeWidth: 1
        }

        this.options = Object.assign({}, defaults, options);
    }

    /** @param {CanvasRenderingContext2D} context */
    fill(context) {
        if (this.options.fillColor) {
            const fillColor = typeof this.options.fillColor === 'function'
                ? this.options.fillColor(this)
                : this.options.fillColor;

            context.fillStyle = fillColor;
            context.fill();
        }
    }

    /** @param {CanvasRenderingContext2D} context */
    stroke(context) {
        if (this.options.strokeColor) {
            context.lineWidth = this.options.strokeWidth;
            context.strokeStyle = this.options.strokeColor;
            context.stroke();
        }
    }
}

class Circle extends Shape {
    /**
     * @param {ShapeOptions} options
     */
    constructor(options) {
        super(options)
    }

    /** @param {CanvasRenderingContext2D} context */
    renderTo(context) {
        context.beginPath();
        context.arc(this.options.xCentre, this.options.yCentre, this.options.radius, 0, 2 * Math.PI);
        context.closePath();

        this.stroke(context);
        this.fill(context);
    }
}

class Polygon extends Shape {
    /** @param {ShapeOptions & { sides: number; }} options */
    constructor(options) {
        super(options);
    }

    /** @param {CanvasRenderingContext2D} context */
    renderTo(context) {
        context.beginPath();
        context.moveTo(this.options.xCentre + this.options.radius * Math.sin(0), this.options.yCentre + this.options.radius * Math.cos(0));

        Array(this.options.sides).fill(null).forEach((value, side) => {
            const n = side * 2 * Math.PI / (this.options.sides);
            context.lineTo(
                this.options.xCentre + this.options.radius * Math.sin(n),
                this.options.yCentre + this.options.radius * Math.cos(n)
            );
        });

        context.closePath();

        this.stroke(context);
        this.fill(context);
    }
}

class RadialGradient {
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {{
     *      x0: number;
     *      y0: number;
     *      r0: number;
     *      x1: number;
     *      y1: number;
     *      r1: number;
     * }} options
     * @param {ColourStop[]} colourStops
     */
    static create(context, options, colourStops) {
        const gradient = context.createRadialGradient(
            options.x0,
            options.y0,
            options.r0,
            options.x1,
            options.y1,
            options.r1
        );

        colourStops.forEach(({ offset, color }) => {
            gradient.addColorStop(offset, color);
        });

        return gradient;
    }
}

const colours = {
    deepBlue: 'rgba(9, 14, 17, 1)',
    lightBlue: 'rgba(86, 167, 170, 1)',
    orange: 'rgba(244, 144, 84, 1)',
    transparent: 'transparent',
    white: 'white',
    yellow: 'rgba(238, 209, 43, 1)'
}

window.onload = function() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('#staticCanvas');
    const context = canvas.getContext('2d');
    const maxSize = Math.min(canvas.parentNode.scrollHeight, canvas.parentNode.scrollWidth);
    canvas.height = canvas.parentNode.scrollHeight;
    canvas.width = canvas.parentNode.scrollWidth;

    const frames = [
        new Polygon({
            xCentre: canvas.width * .5,
            yCentre: canvas.width * .465,
            radius: canvas.width * .445,
            strokeColor: colours.yellow,
            strokeWidth: canvas.width * .015,
            sides: 6
        }),
        new Polygon({
            xCentre: canvas.width * .5,
            yCentre: canvas.width * .465,
            radius: canvas.width * .445,
            strokeColor: colours.yellow,
            strokeWidth: canvas.width * .015,
            sides: 6
        }),
    ]

    const smallPlanet = new Circle({
        xCentre: canvas.width * 0.495,
        yCentre: canvas.width * 0.205,
        radius: canvas.width * 0.09,
        fillColor(circle) {
            return RadialGradient.create(
                context,
                {
                    x0: circle.options.xCentre * .65,
                    y0: circle.options.yCentre * .65,
                    r0: circle.options.radius * 2.5,
                    x1: circle.options.xCentre * 1.2,
                    y1: circle.options.yCentre * 1.5,
                    r1: circle.options.radius * .9
                },
                [
                    { color: colours.white, offset: .4 },
                    { color: colours.lightBlue, offset: .65 },
                    { color: colours.deepBlue, offset: .7 },
                ]
            );
        }
    });

    const largePlanet = new Circle({
        xCentre: canvas.width * .5,
        yCentre: canvas.height * .475,
        radius: canvas.height * .245,
        fillColor(circle) {
            return RadialGradient.create(
                context,
                {
                    x0: circle.options.xCentre * 1.2,
                    y0: circle.options.yCentre * 1.35,
                    r0: circle.options.radius * 0.5,
                    x1: circle.options.xCentre * 0.95,
                    y1: circle.options.yCentre * 0.95,
                    r1: circle.options.radius * 1.5
                },
                [
                    { color: colours.deepBlue, offset: .55 },
                    { color: colours.lightBlue, offset: .65 },
                    { color: colours.white, offset: .68 },
                ]
            );
        },
    });

    // [smallPlanet, largePlanet].forEach(shape => shape.renderTo(context));
}
