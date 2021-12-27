// export function removeEmpty(obj: { [index: string]: any }) {
//     Object.keys(obj).forEach((k) => obj[k] == null && delete obj[k]);
//     return obj;
// }

export function removeNullOrEmpty(obj: { [index: string]: any }) {
    Object.keys(obj).forEach((k) => (!obj[k]||( obj[k].length == 0)) && delete obj[k])
    return obj
}

export function removeCond(obj: { [index: string]: any }, cond: (obj: any) => boolean) {
    Object.keys(obj).forEach((k) => (!cond(obj[k])) && delete obj[k])
    return obj
}
