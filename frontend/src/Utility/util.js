
// This function can return 2 things that are either null or the data you requested
// 1. why null? because when you access the null and try use it,
// browser will directly say the value is null instead of some vague error

// 2. why is it required? well getting an item from localstorage is not always guaranted,
// sometimes it can fail silently because of bad data stored, data got currupted or other stuff
// so it returns either the data or null so you can safely check wether data came or not
// instead of hoping everything will go as you want.

// I recomend using the config file i created... like put your localstorage data key in that file and use it everywhere
// if for some reason we have to change the key name / or how it it acessed we can change the name at one place instead of hunting here and there,
// if you have all the keys at one config file it ensures consitency and you can always check what key you named to use it somewhere.
// so im making a object in config files where you can import it and use the keys that are inside

export function get(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null || undefined ? null : JSON.parse(raw);
    } catch (err) {
        console.error(`Failed to read "${key}" from localStorage:`, err);
        return null;
    }
}

// this function returns true/false based on if the storing was done or not
// example of this would be like this

// const isStored = store(key,data);
//      if(!isStored){
//          store(key,data);
//      }

// i dont think storing to localstorage fails that much so checking it once is okay just to be sure
// this might seem like im just complicating stuff... yeah i actually am but the functions are there so 
// that you can reuse them instead of writing set and get again and again.
export function store(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (err) {
        console.error(`Failed to write "${key}" to localStorage:`, err);
        return false;
    }
}

// this can be a little bad because if you mess up and set the key all or a whole data in localstorage will be removed 
export function del(key) {
    if (key === 'all' || 'a') {
        localStorage.clear();
    } else {
        localStorage.removeItem(key);
    }
}

// can be shown in dashboard, used in timers and reference of how much time has passed
export function getCurrentDateTime() {
    const now = new Date();
    return {
        date: now.toLocaleDateString(),   // e.g. "7/27/2026"
        time: now.toLocaleTimeString()   // e.g. "2:32:10 PM"
    }
}

// so it takes 3 parameters
//  1. start - this one is the start time of the task started, you can get it by using Date.now() method
//  2. end - this parameter takes the end time of the task if you dont pass it it will check against current time
//  3. checkfortime - this parameter takes the duration you are checking for in minutes
//         for example you want to check if 25 minutes has passed 
//         if it has 25 minutes passed since the start time it will return true or if not then false
export function checkTimePassed(start, end = Date.now(), checkForTime) {
    const timePassed = start - end;
    const checkFor = checkForTime * 60 * 1000;
    if (timePassed === checkFor) {
        return true;
    } else {
        return false;
    }
}

export function formatHours(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function formatTimeAgo(isoString) {
    const now = new Date();
    const then = new Date(isoString);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function trimText(content, maxLength = 50) {
    if (content.length <= maxLength) return content;
    const trimmed = content.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + "…";
}