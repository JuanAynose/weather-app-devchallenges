export const requestuwu = async(url)=>{
     const resUwU =await fetch(url)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
    return resUwU;
};