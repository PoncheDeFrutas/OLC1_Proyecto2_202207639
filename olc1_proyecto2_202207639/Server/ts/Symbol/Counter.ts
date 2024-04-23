
export default class Counter{
    private static instance: Counter
    private counter: number

    private constructor(){
        this.counter = 0
    }

    public static getInstance(): Counter{
        if (!Counter.instance){
            Counter.instance = new Counter()
        }
        return Counter.instance
    }

    get(){
        this.counter++;
        return this.counter
    }



}