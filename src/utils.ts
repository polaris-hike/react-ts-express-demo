

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

export function debounce(fn:Function,wait:number) {
    let timeout:number = null;
    return function () {
            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(fn,wait)
    }
}