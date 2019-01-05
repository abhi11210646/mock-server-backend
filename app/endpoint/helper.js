module.exports = {
    setHeaders:(res, headers) =>{
        headers = headers.reduce((a,i)=>Object.assign(a,i),{});
        res.set(headers);
    }
};