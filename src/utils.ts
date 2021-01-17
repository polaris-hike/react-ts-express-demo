export function loadMore(element: HTMLElement, callback: Function) {
    function _loadMore() {
        const containerHeight = element.clientHeight;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        if (containerHeight + scrollTop + 20 >= scrollHeight) {
            callback()
        }
    }

    element.addEventListener('scroll', debounce(_loadMore, 300))
}

export function downRefresh(element: HTMLElement, callback: Function) {
    let startY: number, distance: number, originalTop = element.offsetTop, $timer: any,currentTop:number;
    element.addEventListener('touchstart', function (event: TouchEvent) {
        if ($timer) {
            clearInterval($timer)
        }
        const touchMove = throttle(_touchMove, 30)
        if (element.scrollTop === 0) {
            currentTop = element.offsetTop;
            startY = event.touches[0].pageY;
            element.addEventListener('touchmove', touchMove)
            element.addEventListener('touchend', touchEnd)
        }

        function _touchMove(event: TouchEvent) {
            let pageY = event.touches[0].pageY;
            if (pageY > startY) {
                distance = pageY - startY;
                element.style.top = currentTop + distance + 'px'
            }
        }

        function touchEnd(event: TouchEvent) {
            element.removeEventListener('touchmove', touchMove)
            element.removeEventListener('touchend', touchEnd)
            if (distance > 30) {
                callback()
            }
            $timer = setInterval(() => {
                let currentTop = element.offsetTop;
                if(currentTop - originalTop > 1){
                    element.style.top = (currentTop -1) +'px'
                }else {
                    element.style.top = originalTop + 'px';
                }
            }, 13);
        }
    })
}

export function debounce(fn: Function, wait: number) {
    let timeout: number = null;
    return function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(fn, wait)
    }
}

export function throttle(fn: Function, delay: number) {
    let prev = Date.now()
    return function () {
        let context = this;
        let args = arguments;
        let now = Date.now()
        if (now - prev >= delay) {
            fn.apply(context, args);
            prev = now
        }
    }
}