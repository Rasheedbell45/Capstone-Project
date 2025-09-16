export function saveToCache(key: string, data: any, ttl = 1000 * 60 * 10) {
const item = {
value: data,
expiry: Date.now() + ttl,
};
localStorage.setItem(key, JSON.stringify(item));
}


export function getFromCache(key: string) {
const itemStr = localStorage.getItem(key);
if (!itemStr) return null;
const item = JSON.parse(itemStr);
if (Date.now() > item.expiry) {
localStorage.removeItem(key);
return null;
}
return item.value;
}
