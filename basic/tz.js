let tn=document.querySelector(".wqe");
let tz=[ "Home",'/'
        ,"Link",'/link'
        ,"About",'/about'];
let tl=tz.length;
for(let i=0;i<tl;i+=2){
    wei(tz[i],tz[i+1]);
}
function wei(a,b){
    let _tz=document.createElement("tz");
    _tz.innerText=a;
    _tz.className="eir";
    _tz.onclick=()=>{
        location.href=b;
    };
    tn.append(_tz);
}