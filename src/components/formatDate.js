
export const formatDate=(timestamp, full=false)=>{
    const date = new Date(timestamp*1000);
    const hours = date.getUTCHours();
    const minutes = "0" + date.getUTCMinutes();
    
    const d = (!full) ? "":("0" + date.getDate()).slice(-2) + "." 
		+ ("0"+(date.getMonth()+1)).slice(-2) + "." 
		+ date.getFullYear() + " "
    
    return d + hours + ':' + minutes.substr(-2);
}