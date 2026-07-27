// to use it you can add the keyname you are planning to use here and use it everywhere
// no need to memorize the key name just check here if you even forget and need to know
export const KEYS = {
    // ABSOLUTELY NOT NAME THE KEY NAME "ALL" or "all" or 'a'
    // why? well because there is a function to remove all the data from localstorage
    // it takes your keyname if the name is 'all' or 'a' it will delete whole localstorage object insted of the targetted keyitem.
    example: 'example',
}