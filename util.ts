export class Util {
    static randInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) ) + min
    }
}