const format_curency = (a)=> {
        
    a=a.toString();
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    
    return a;
}
export default format_curency;