export const throttle=(()=>{
    let timer=null;
    return (callback,wait)=>{
        if(timer) return;        
        timer=setTimeout(callback,wait)
        timer=null;
    }    
})()