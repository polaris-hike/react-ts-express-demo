export function loadMore(element:HTMLElement,callback:Function) {
    function _loadMore() {
        console.log('_loadMore');
        const containerHeight = element.clientHeight;
        const scrollTop  = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        if(containerHeight + scrollTop +20 >= scrollHeight) {
            callback()
        }
    }
    element.addEventListener('scroll',debounce(_loadMore,300))
}

export function downRefresh(element:HTMLElement,callback:Function) {
    let startY:number,distance:number,originalTop = element.offsetTop;
    element.addEventListener('touchstart',function (event:TouchEvent) {
        if(element.offsetTop === originalTop && element.scrollTop === 0) {
            startY = event.touches[0].pageY;
            element.addEventListener('touchmove',throttle(_touchMove,60))
            element.addEventListener('touchend',touchEnd)
        }
        function _touchMove(event:TouchEvent) {
            console.log('_touchMove');
            let pageY = event.touches[0].pageY;
            if(pageY > startY) {
                distance = pageY - startY;
                element.style.top = originalTop + distance+'px'
            }
        }

        function touchEnd(event:TouchEvent) {
            element.removeEventListener('touchmove',_touchMove)
            element.removeEventListener('touchend',touchEnd)
            if(distance > 30){
                callback()
            }
            let $timer = setInterval(()=>{
                if(distance < 1){
                    element.style.top = originalTop + 'px'
                    clearInterval($timer)
                }
                element.style.top = originalTop + (--distance)+ 'px'
            },13);

        }

    })
}

export function debounce(fn:Function,wait:number) {
    let timeout:number = null;
    return function () {
            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(fn,wait)
    }
}

export function throttle(fn:Function,delay:number) {
    let prev = Date.now()
    return function () {
        let context = this;
        let args = arguments;
        let now = Date.now()
        if(now  - prev >= delay) {
            fn.apply(context,args);
            prev = now
        }
    }
}