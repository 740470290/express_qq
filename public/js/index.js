const socket = io.connect('ws://172.17.14.250');
const text=document.querySelector('#text');
const show=document.querySelector('.show');
const content=document.querySelector('.content');
const btn_send=document.querySelector('.btn_send');
const submit=document.querySelector('.submit');
const login=document.querySelector('.login');
var wecharName='';
socket.on('msgs', function (data) {
console.log(data);
if(data.name===wecharName){
    show.innerHTML+='<div class="right"><div class="plain"><pre class="js_message_plain">'+data.serverMsg+'</pre></div><div class="name">'+data.name+'</div></div>';
}else{
    show.innerHTML+='<div class="left"><div class="name">'+data.name+'</div><div class="plain_left"><pre class="js_message_plain">'+data.serverMsg+'</pre></div></div>';
}
show.scrollTop = show.scrollHeight;
});
text.onkeydown=function (e) {
 if(e.keyCode===13) {
     if(e.ctrlKey){
         this.value+= "\n";
     }else {
        e.preventDefault();
        if(this.value.trim().length>0&&this.value.trim().length<101){
            socket.emit('send', { name:wecharName,msg: this.value });
            console.log(this.value);
            this.value=''
        }
     }
    }
};
btn_send.onclick=function () {
    if(text.value.trim().length>0&&text.value.trim().length<21){
        socket.emit('send', { msg: text.value });
        console.log(text.value);
        text.value=''
    }
};
function getCookie(key) {
    const cook=document.cookie;
    const a=cook.indexOf(key);
    if(a===-1){
        login.style.display='block'
    }else{
        show.style.display='block';
        content.style.display='block';
        const b=cook.indexOf(';',a);
        if(b===-1){
            document.querySelector('.welcome').innerHTML+=','+cook.slice(a+key.length+1);
            wecharName=cook.slice(a+key.length+1)
        }else{
            document.querySelector('.welcome').innerHTML+=','+cook.slice(a+key.length+1,b);
            wecharName=cook.slice(a+key.length+1,b)
        }
    }
}
getCookie('wechatName');
submit.onclick=function () {
    const val=this.previousElementSibling.value;
    if(val.length>0&&val.length<11){
        document.cookie = 'wechatName='+val+';path=/;Max-Age='+1e7;
        login.style.display='none';
        show.style.display='block';
        content.style.display='block';
        document.querySelector('.welcome').innerHTML+=','+val;
        wecharName=val;
        text.focus()
    }
};
